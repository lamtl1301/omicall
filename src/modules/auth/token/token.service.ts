import { Injectable } from '@nestjs/common';
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
        private jwtService : JwtService,
        private readonly configService: ConfigService<EnviromentVariables>
    ) {}
    
    async createJWTToken(id: number, expire: Moment) {
        const payload: JWTPayload = {
            sub: id,
            iat: moment().unix(),
            exp: expire.unix(),
        };
        return this.jwtService.sign(payload)
    }

    async createToken(id: number, type: TokenType){
        const tokenId = crypto.randomBytes(24).toString('hex');
        let expiresIn = new Date();
        switch(type){
            case TokenType.REFRESH_TOKEN: {
                expiresIn = moment()
                    .add(this.configService.get('REFRESH_TOKEN_EXPIRATION_DAYS'), 'days')
                    .toDate();
                break;
            }
            case TokenType.VERIFY_EMAIL: {
                expiresIn = moment()
                    .add(this.configService.get('VERIFY_EMAIL_TOKEN_EXPIRATION_MINUTES'), 'day')
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

    async createRefreshToken(agent_id: number){
        return this.createToken(agent_id, TokenType.REFRESH_TOKEN);
    }

    async verifyJWTToken(token: string) {
        return this.jwtService.verify<JWTPayload>(token);
    }

    async createAuthToken(id: number) {
        const accessTokenExpires = moment().add(
            this.configService.get<number>('ACCESS_TOKEN_EXPIRATION_MINUTES'),
            'minutes',
        );
        const accessToken = this.createJWTToken(id, accessTokenExpires);
        console.log(accessToken)
        const refreshToken = this.createRefreshToken(id)
        console.log(refreshToken)
        return { accessToken,
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
            const newToken = this.createAuthToken(token.agentID)
            await this.tokenRepositoy.remove(token);
            return newToken
        } catch (error) {
            throw error
        }
    }
    async getTokenByID(agent_id: number, type: TokenType){
        return this.tokenRepositoy.findOneOrFail({
            where: {
                agentID: agent_id,
                type: type
            }
        })
    }
    async remove(agent_id: number){
        try {
            const token = await this.getTokenByID(agent_id, TokenType.REFRESH_TOKEN)
            this.tokenRepositoy.remove(token)
        } catch (error) {
            throw error
        }
    }
}
