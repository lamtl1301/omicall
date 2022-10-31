import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';
import { Repository } from 'typeorm';
import { AgentService } from '../agent/agent.service';
import { Agent } from '../agent/entities/agent.entity';
import { Attribute } from '../attribute/entities/attribute.entity';
import { ProjectAttribute } from '../attribute/entities/project-attribute.entity';
import { RoleService } from '../role/role.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
export declare class ProjectService {
    private readonly projectRepository;
    private readonly projectAttributeRepository;
    private readonly attributeRepository;
    private readonly agentService;
    private readonly roleService;
    constructor(projectRepository: Repository<Project>, projectAttributeRepository: Repository<ProjectAttribute>, attributeRepository: Repository<Attribute>, agentService: AgentService, roleService: RoleService);
    create(createProjectDto: CreateProjectDto, agentID: number): Promise<void>;
    getListProject(pageOptionsDto: PageOptionsDto): Promise<PageDto<Project>>;
    getListProjectOfAgent(agent: Agent): Promise<Project[]>;
    getById(projectID: number, tenantID: string): Promise<Project>;
    update(tenantID: string, id: number, updateProjectDto: UpdateProjectDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number, tenant_id: string): Promise<import("typeorm").UpdateResult>;
}
