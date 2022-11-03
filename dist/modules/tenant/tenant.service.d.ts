import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';
import { Repository } from 'typeorm';
import { AgentService } from '../agent/agent.service';
import { Role } from '../role/entities/role.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './entities/tenant.entity';
export declare class TenantService {
    private readonly tenantRepository;
    private readonly roleRepository;
    private readonly agentService;
    constructor(tenantRepository: Repository<Tenant>, roleRepository: Repository<Role>, agentService: AgentService);
    create(userID: number, createTenantDto: CreateTenantDto): Promise<{
        tenant: Tenant;
    }>;
    getListTenant(pageOptionsDto: PageOptionsDto, userID: number): Promise<PageDto<Tenant>>;
    findById(id: string): Promise<Tenant>;
    update(id: string, updateTenantDto: UpdateTenantDto): Promise<void>;
    remove(id: string): Promise<void>;
}
