import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AgentService } from '../agent/agent.service';
import bcrypt from 'bcrypt'
import moment, { Moment } from 'moment'
import { JWTPayload } from 'src/interface/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnviromentVariables } from 'src/interface/env.interface';
import { TokenService } from './token/token.service';
import { Token, TokenType } from './entities/token.entity';
import { ProjectService } from '../project/project.service';
import { TenantService } from '../tenant/tenant.service';
import { Agent } from '../agent/entities/agent.entity';
import { MailService } from '../mail/mail.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly agentService: AgentService,
        private readonly tokenService: TokenService,
        private readonly projectService: ProjectService,
        private readonly tenantService: TenantService,
        private readonly mailService: MailService,
        private readonly jwtService: JwtService,
        @InjectRepository(Token)
        private tokenRepositoy: Repository<Token>,
        private readonly configService: ConfigService<EnviromentVariables>
    ) { }
    async validateUser(id: number) {
        const user = await this.agentService.getById(id);
        return user;
    }

    async prelogin(email: string, password: string): Promise<any> {
        try {
            const user = await this.agentService.getByEmail(email);
            if (user && bcrypt.compare(password, user.password) && user.isDeleted == false) {
                const tenant = await this.tenantService.findById(user.tenantID)
                if (tenant && tenant.isVihat == true || user.isOwner == true){
                    const token = await this.tokenService.createAuthToken(user.id)
                    return { user, token}
                } else {
                    const listProject = await this.projectService.getListProjectOfTenant(user.tenantID);
                    //th listproject null, user.isowner == true (tenant)
                    return { user, tenant, listProject  }
                }
            } else {
                throw new ForbiddenException('Access denied')
            }
        } catch (error) {
            throw error
        }
    }

    async login(agentId: number, projectID: number){
        try {
            const user = await this.agentService.getById(agentId);
            if (user && user.isActived == true){
                const token = await this.tokenService.createAuthToken(user.id);
                return { user, token, projectID }
            } else {
                throw new ForbiddenException('Access denied')
            }
        } catch (error) {
            throw error
        } 
    }


    async refreshTokens(refreshToken: string) {
        try {
            return this.tokenService.refresh(refreshToken)
        } catch (error) {
            throw new UnauthorizedException('Access denied')
        }
    }

    async logout(agent_id: number) {
        try {
            return this.tokenService.remove(agent_id, TokenType.REFRESH_TOKEN)
        } catch (error) {
            throw error
        }
    }
    async verifyEmail(verifyToken: string) {
        try {
            console.log("verifyToken", verifyToken)
            const token = await this.tokenRepositoy.findOneOrFail({ 
                where: {
                    id: verifyToken
                }
            })
            console.log("token", token)
            const isTokenExpired = await this.tokenService.verifyToken( token.id, TokenType.VERIFY_EMAIL);
            console.log("isTokenExpired", isTokenExpired)
            if (isTokenExpired){
                await this.agentService.activedAgent(token.agentID)
                await this.tokenService.remove(token.agentID, TokenType.VERIFY_EMAIL)
                
            } else {
                throw new BadRequestException(' Token is expired')
            }

        } catch (error) {
            throw error
        }
    }
}
