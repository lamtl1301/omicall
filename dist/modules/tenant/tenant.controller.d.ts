import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';
import { Tenant } from './entities/tenant.entity';
export declare class TenantController {
    private readonly tenantService;
    constructor(tenantService: TenantService);
    getListTenant(userID: number, pageOptionsDto: PageOptionsDto): Promise<PageDto<Tenant>>;
    getTenant(id: string): Promise<Tenant>;
    create(userID: number, createTenantDto: CreateTenantDto): Promise<{
        tenant: Tenant;
    }>;
    update(tenantID: string, updateTenantDto: UpdateTenantDto, userID: number): Promise<void>;
    remove(tenantID: string, userID: number): Promise<void>;
}
