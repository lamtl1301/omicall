import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';
import { Tenant } from './entities/tenant.entity';
export declare class TenantController {
    private readonly tenantService;
    constructor(tenantService: TenantService);
    getListTenant(pageOptionsDto: PageOptionsDto): Promise<PageDto<Tenant>>;
    getTenant(id: string): Promise<Tenant>;
    create(createTenantDto: CreateTenantDto): Promise<Tenant>;
    update(id: string, updateTenantDto: UpdateTenantDto): Promise<void>;
    remove(id: string): Promise<void>;
}
