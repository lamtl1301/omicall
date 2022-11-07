import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';
import { Repository } from 'typeorm';
import { AgentService } from '../agent/agent.service';
import { Agent } from '../agent/entities/agent.entity';
import { Project } from '../project/entities/project.entity';
import { ProjectService } from '../project/project.service';
import { Role } from '../role/entities/role.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './entities/tenant.entity';
export declare class TenantService {
    private readonly tenantRepository;
    private readonly roleRepository;
    private readonly agentRepository;
    private readonly projectRepository;
    private readonly agentService;
    private readonly projectService;
    constructor(tenantRepository: Repository<Tenant>, roleRepository: Repository<Role>, agentRepository: Repository<Agent>, projectRepository: Repository<Project>, agentService: AgentService, projectService: ProjectService);
    create(userID: number, createTenantDto: CreateTenantDto): Promise<{
        tenant: Tenant;
    }>;
    getListTenant(pageOptionsDto: PageOptionsDto, userID: number): Promise<PageDto<Tenant>>;
    findById(id: string): Promise<Tenant>;
    update(uTenantID: string, updateTenantDto: UpdateTenantDto, userID: number): Promise<void>;
    remove(deleteTenantID: string, userID: number): Promise<void>;
}
