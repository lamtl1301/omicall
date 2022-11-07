import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import moment, { Moment } from 'moment';
import { EnviromentVariables } from 'src/interface/env.interface';
import { JWTPayload } from 'src/interface/jwt.interface';
import { Repository } from 'typeorm';
import { Token, TokenType } from '../entities/token.entity';
import crypto from 'crypto';


@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token)
        private tokenRepositoy: Repository<Token>,
        private jwtService: JwtService,
        private readonly configService: ConfigService<EnviromentVariables>
    ) { }

    async createJWTToken(id: number, expire: Moment) {
        const payload: JWTPayload = {
            sub: id,
            iat: moment().unix(),
            exp: expire.unix(),
        };
        return this.jwtService.sign(payload)
    }

    async createToken(id: number, type: TokenType) {
        const tokenId = crypto.randomBytes(24).toString('hex');
        let expiresIn = new Date();
        switch (type) {
            case TokenType.REFRESH_TOKEN: {
                expiresIn = moment()
                    .add(this.configService.get('REFRESH_TOKEN_EXPIRATION_DAYS'), 'days')
                    .toDate();
                break;
            }
            case TokenType.VERIFY_EMAIL: {
                expiresIn = moment()
                    .add(this.configService.get('VERIFY_EMAIL_TOKEN_EXPIRATION_DAYS'), 'day')
                    .toDate();
                break;
            }
        }
        const token = this.tokenRepositoy.create({
            id: tokenId,
            type: type,
            expiresIn: expiresIn,
            agentID: id
        })
        this.tokenRepositoy.save(token)
        return tokenId
    }

    async createRefreshToken(agent_id: number) {
        return this.createToken(agent_id, TokenType.REFRESH_TOKEN);
    }

    async createVerifyToken(agent_id: number) {
        return this.createToken(agent_id, TokenType.VERIFY_EMAIL);
    }

    async verifyJWTToken(token: string) {
        return this.jwtService.verify<JWTPayload>(token);
    }

    async createAuthToken(id: number) {
        const accessTokenExpires = moment().add(
            this.configService.get<number>('ACCESS_TOKEN_EXPIRATION_MINUTES'),
            'minutes',
        );
        const accessToken = await this.createJWTToken(id, accessTokenExpires);
        // console.log(accessToken)
        const refreshToken = await this.createRefreshToken(id)
        // console.log(refreshToken)
        return {
            accessToken,
            refreshToken,
        };
    }

    async refresh(refreshToken: string) {
        try {
            const token = await this.tokenRepositoy.findOneOrFail({
                where: {
                    id: refreshToken
                }
            })
            const isTokenExpired = await this.verifyToken(token.id, TokenType.REFRESH_TOKEN);

            if (isTokenExpired) {
                const newToken = this.createAuthToken(token.agentID)
                await this.tokenRepositoy.remove(token);
                return newToken
            } else {
                throw new BadRequestException(' Token is expired')
            }

        } catch (error) {
            throw error
        }
    }

    async getTokenByAgentID(agent_id: number, type: TokenType) {
        return this.tokenRepositoy.findOneOrFail({
            where: {
                agentID: agent_id,
                type: type
            }
        })
    }
    async remove(agent_id: number, type: TokenType) {
        try {
            const token = await this.getTokenByAgentID(agent_id, type)
            this.tokenRepositoy.remove(token)
        } catch (error) {
            throw error
        }
    }
    async verifyToken(token: string, type: TokenType) {
        const findToken = await this.tokenRepositoy.findOne({
            where: {
                id: token,
                type: type
            }
        })
        if (findToken) {
            const dateNow = new Date()
            console.log(dateNow)
            let exp: number
            switch (type) {
                case TokenType.REFRESH_TOKEN: {
                    exp = this.configService.get('REFRESH_TOKEN_EXPIRATION_DAYS')
                    break;
                }
                case TokenType.VERIFY_EMAIL: {
                    exp = this.configService.get('VERIFY_EMAIL_TOKEN_EXPIRATION_DAYS')
                    break;
                }
            }
            let expDay = findToken.expiresIn
            const dayOfExp = Number(expDay.getDate()) + Number(exp)
            expDay.setDate(dayOfExp)
            if (expDay.getTime() < dateNow.getTime()) {
                return false
            } else {
                return true;
            }
        }
    }

}
