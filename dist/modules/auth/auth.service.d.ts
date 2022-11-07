import { AgentService } from '../agent/agent.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnviromentVariables } from 'src/interface/env.interface';
import { TokenService } from './token/token.service';
import { Token } from './entities/token.entity';
import { ProjectService } from '../project/project.service';
import { TenantService } from '../tenant/tenant.service';
import { Agent } from '../agent/entities/agent.entity';
import { MailService } from '../mail/mail.service';
import { Repository } from 'typeorm';
export declare class AuthService {
    private readonly agentService;
    private readonly tokenService;
    private readonly projectService;
    private readonly tenantService;
    private readonly mailService;
    private readonly jwtService;
    private tokenRepositoy;
    private readonly configService;
    constructor(agentService: AgentService, tokenService: TokenService, projectService: ProjectService, tenantService: TenantService, mailService: MailService, jwtService: JwtService, tokenRepositoy: Repository<Token>, configService: ConfigService<EnviromentVariables>);
    validateUser(id: number): Promise<Agent>;
    prelogin(email: string, password: string): Promise<any>;
    login(agentId: number, projectID: number): Promise<{
        user: Agent;
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
    verifyEmail(verifyToken: string): Promise<void>;
}
