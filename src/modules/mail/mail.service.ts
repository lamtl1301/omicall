import { MailerService } from '@nestjs-modules/mailer';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Agent } from '../agent/entities/agent.entity';
import { TokenService } from '../auth/token/token.service';
import { TenantService } from '../tenant/tenant.service';



@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private tokenService: TokenService,

    ) {}


  async sendVerificationEmail(password: string, agent: Agent, tenantName: string ) {
    const token = await this.tokenService.createVerifyToken(agent.id);
    //console.log("token", token)
    //const url = `http://localhost:3000/api/v1/auth/confirm?token=${token}`;
    const url = `https://54.255.21.238.nip.io/api/v1/auth/confirm?token=${token}`;
    //console.log("url", url)
    return await this.mailerService.sendMail({
      to: agent.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Omicall! You have been invite',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: agent.fullName,
        tenant: tenantName,
        email: agent.email,
        password: password,
        url: url,
      },
    });
  }
}
