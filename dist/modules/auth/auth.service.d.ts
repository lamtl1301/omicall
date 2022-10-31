import { AgentService } from '../agent/agent.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnviromentVariables } from 'src/interface/env.interface';
import { TokenService } from './token/token.service';
import { ProjectService } from '../project/project.service';
import { TenantService } from '../tenant/tenant.service';
export declare class AuthService {
    private readonly agentService;
    private readonly tokenService;
    private readonly projectService;
    private readonly tenantService;
    private readonly jwtService;
    private readonly configService;
    constructor(agentService: AgentService, tokenService: TokenService, projectService: ProjectService, tenantService: TenantService, jwtService: JwtService, configService: ConfigService<EnviromentVariables>);
    validateUser(id: number): Promise<import("../agent/entities/agent.entity").Agent>;
    prelogin(email: string, password: string): Promise<any>;
    login(agentId: number, projectID: number): Promise<{
        user: import("../agent/entities/agent.entity").Agent;
        token: {
            accessToken: string;
            refreshToken: string;
        };
        projectID: number;
    }>;
    refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(agent_id: number): Promise<void>;
}
