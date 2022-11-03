import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AgentService } from '../agent/agent.service';
import bcrypt from 'bcrypt'
import moment, { Moment } from 'moment'
import { JWTPayload } from 'src/interface/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnviromentVariables } from 'src/interface/env.interface';
import { TokenService } from './token/token.service';
import { TokenType } from './entities/token.entity';
import { ProjectService } from '../project/project.service';
import { TenantService } from '../tenant/tenant.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly agentService: AgentService,
        private readonly tokenService: TokenService,
        private readonly projectService: ProjectService,
        private readonly tenantService: TenantService,
        private readonly jwtService: JwtService,
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
                    const listProject = await this.projectService.getListProjectOfAgent(user);
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
            return this.tokenService.remove(agent_id)
        } catch (error) {
            throw error
        }
    }
}
