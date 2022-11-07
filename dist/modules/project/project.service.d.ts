import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';
import { Repository } from 'typeorm';
import { AgentService } from '../agent/agent.service';
import { Attribute } from '../attribute/entities/attribute.entity';
import { ProjectAttribute } from '../attribute/entities/project-attribute.entity';
import { RoleService } from '../role/role.service';
import { TenantService } from '../tenant/tenant.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
export declare class ProjectService {
    private readonly projectRepository;
    private readonly projectAttributeRepository;
    private readonly attributeRepository;
    private readonly agentService;
    private readonly tenantService;
    private readonly roleService;
    constructor(projectRepository: Repository<Project>, projectAttributeRepository: Repository<ProjectAttribute>, attributeRepository: Repository<Attribute>, agentService: AgentService, tenantService: TenantService, roleService: RoleService);
    create(createProjectDto: CreateProjectDto, agentID: number, tenantID: string): Promise<Project>;
    getListProject(tenantID: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<Project>>;
    getListProjectOfTenant(tenantID: string): Promise<Project[]>;
    getById(projectID: number, tenantID: string): Promise<Project>;
    update(tenantID: string, id: number, updateProjectDto: UpdateProjectDto): Promise<Project>;
    remove(id: number, tenant_id: string): Promise<import("typeorm").UpdateResult>;
}
