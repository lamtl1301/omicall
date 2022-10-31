import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Repository } from 'typeorm';
import { Agent } from './entities/agent.entity';
import { Role } from '../role/entities/role.entity';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';
import { AgentAttribute } from '../attribute/entities/agent-attribute.entity';
import { Attribute } from '../attribute/entities/attribute.entity';
export declare class AgentService {
    private readonly agentRepository;
    private readonly roleRepository;
    private readonly agentAttributeRepository;
    private readonly attributeRepository;
    constructor(agentRepository: Repository<Agent>, roleRepository: Repository<Role>, agentAttributeRepository: Repository<AgentAttribute>, attributeRepository: Repository<Attribute>);
    createAgent(tenantID: string, createAgentDto: CreateAgentDto): Promise<Agent>;
    getAll(): Promise<Repository<Agent>>;
    getListAgent(pageOptionsDto: PageOptionsDto): Promise<PageDto<Agent>>;
    getById(id: number): Promise<Agent>;
    getByEmail(email: string): Promise<Agent>;
    update(id: number, tenantID: string, updateAgentDto: UpdateAgentDto): Promise<any>;
    remove(id: number, tenantID: string): Promise<string>;
}
