import { MailerService } from '@nestjs-modules/mailer';
import { Agent } from '../agent/entities/agent.entity';
import { TokenService } from '../auth/token/token.service';
export declare class MailService {
    private mailerService;
    private tokenService;
    constructor(mailerService: MailerService, tokenService: TokenService);
    sendVerificationEmail(password: string, agent: Agent, tenantName: string): Promise<SentMessageInfo>;
}
