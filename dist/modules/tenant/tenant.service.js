"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const page_meta_dto_1 = require("../../common/page-meta.dto");
const pagination_dto_1 = require("../../common/pagination.dto");
const typeorm_2 = require("typeorm");
const agent_service_1 = require("../agent/agent.service");
const role_entity_1 = require("../role/entities/role.entity");
const tenant_entity_1 = require("./entities/tenant.entity");
let TenantService = class TenantService {
    constructor(tenantRepository, roleRepository, agentService) {
        this.tenantRepository = tenantRepository;
        this.roleRepository = roleRepository;
        this.agentService = agentService;
    }
    async create(userID, createTenantDto) {
        try {
            const agent = await this.agentService.getById(userID);
            const agentTenant = await this.findById(agent.tenantID);
            if (agentTenant && agentTenant.isVihat == true) {
                const checkTenant = await this.findById(createTenantDto.id);
                if (checkTenant) {
                    throw new common_1.BadRequestException('Tenant ID is existed');
                }
                else {
                    const tenant = this.tenantRepository.create({
                        id: createTenantDto.id,
                        fullName: createTenantDto.full_name,
                        description: createTenantDto.description,
                        nation: createTenantDto.nation,
                        language: createTenantDto.language
                    });
                    this.tenantRepository.save(tenant);
                    return { tenant };
                }
            }
            else {
                throw new common_1.ForbiddenException('Access denied');
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getListTenant(pageOptionsDto, userID) {
        try {
            const agent = await this.agentService.getById(userID);
            const tenant = await this.findById(agent.tenantID);
            if (tenant && tenant.isVihat == true) {
                const queryBuilder = this.tenantRepository.createQueryBuilder("tenant");
                queryBuilder
                    .orderBy("tenant.createAt", pageOptionsDto.order)
                    .skip(pageOptionsDto.skip)
                    .take(pageOptionsDto.take)
                    .getMany();
                const itemCount = await queryBuilder.getCount();
                const { entities } = await queryBuilder.getRawAndEntities();
                const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto });
                return new pagination_dto_1.PageDto(entities, pageMetaDto);
            }
            else {
                throw new common_1.ForbiddenException('Access denied');
            }
        }
        catch (error) {
            throw error;
        }
    }
    async findById(id) {
        try {
            return this.tenantRepository.findOneBy({ id });
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updateTenantDto) {
        try {
            const tenant = await this.tenantRepository.findOneByOrFail({ id });
            tenant.fullName = updateTenantDto.full_name;
            tenant.description = updateTenantDto.description;
            tenant.nation = updateTenantDto.nation;
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            const tenant = await this.tenantRepository.findOneByOrFail({ id });
            tenant.isDeleted = true;
            tenant.isEnabled = false;
        }
        catch (error) {
            throw error;
        }
    }
};
TenantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        agent_service_1.AgentService])
], TenantService);
exports.TenantService = TenantService;
//# sourceMappingURL=tenant.service.js.map