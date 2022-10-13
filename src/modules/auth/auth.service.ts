import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AgentService } from '../agent/agent.service';
import bcrypt from 'bcrypt'
import moment, { Moment } from 'moment'
import { JWTPayload } from 'src/interface/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnviromentVariables } from 'src/interface/env.interface';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly agentService: AgentService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService<EnviromentVariables>
    ) { }
    async validateUser(id: number) {
        const user = await this.agentService.getById(id);
        return user;
    }

    async login(email: string, password: string): Promise<any> {
        try {
            const user = await this.agentService.getByEmail(email);
            if (user && bcrypt.compare(password, user.password) && user.is_deleted == false) {
                const accessToken = await this.createAuthToken(user.id);
                return { user, accessToken }
            } else {
                throw new UnauthorizedException()
            }
        } catch (error) {
            throw error
        }
    }


    async createJWTToken(id: number, expire: Moment) {
        const payload: JWTPayload = {
            sub: id,
            iat: moment().unix(),
            exp: expire.unix(),
        };
        return this.jwtService.sign(payload)
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
        return accessToken;
    }
}
