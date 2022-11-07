import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';
import { MailService } from '../mail/mail.service';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent } from './entities/agent.entity';
export declare class AgentController {
    private readonly agentService;
    private mailService;
    constructor(agentService: AgentService, mailService: MailService);
    getListAgent(tenantID: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<Agent>>;
    getById(id: string): Promise<Agent>;
    create(tenantID: string, createAgentDto: CreateAgentDto): Promise<{
        agentCreated: Agent;
    }>;
    update(id: string, tenantID: string, updateAgentDto: UpdateAgentDto): Promise<any>;
    remove(id: string, tenantID: string): Promise<string>;
}
