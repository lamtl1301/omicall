import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Moment } from 'moment';
import { EnviromentVariables } from 'src/interface/env.interface';
import { JWTPayload } from 'src/interface/jwt.interface';
import { Repository } from 'typeorm';
import { Token, TokenType } from '../entities/token.entity';
export declare class TokenService {
    private tokenRepositoy;
    private jwtService;
    private readonly configService;
    constructor(tokenRepositoy: Repository<Token>, jwtService: JwtService, configService: ConfigService<EnviromentVariables>);
    createJWTToken(id: number, expire: Moment): Promise<string>;
    createToken(id: number, type: TokenType): Promise<string>;
    createRefreshToken(agent_id: number): Promise<string>;
    createVerifyToken(agent_id: number): Promise<string>;
    verifyJWTToken(token: string): Promise<JWTPayload>;
    createAuthToken(id: number): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getTokenByAgentID(agent_id: number, type: TokenType): Promise<Token>;
    remove(agent_id: number, type: TokenType): Promise<void>;
    verifyToken(token: string, type: TokenType): Promise<boolean>;
}
