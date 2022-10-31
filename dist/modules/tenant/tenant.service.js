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
const role_entity_1 = require("../role/entities/role.entity");
const tenant_entity_1 = require("./entities/tenant.entity");
let TenantService = class TenantService {
    constructor(tenantRepository, roleRepository) {
        this.tenantRepository = tenantRepository;
        this.roleRepository = roleRepository;
    }
    async create(createTenantDto) {
        try {
            const tenant = this.tenantRepository.create(createTenantDto);
            return this.tenantRepository.save(tenant);
        }
        catch (error) {
            throw error;
        }
    }
    async getListTenant(pageOptionsDto) {
        const queryBuilder = this.tenantRepository.createQueryBuilder("tenant");
        queryBuilder
            .orderBy("tenant.createAt", pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take);
        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto });
        return new pagination_dto_1.PageDto(entities, pageMetaDto);
    }
    async findById(id) {
        try {
            return this.tenantRepository.findOneByOrFail({ id });
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
        typeorm_2.Repository])
], TenantService);
exports.TenantService = TenantService;
//# sourceMappingURL=tenant.service.js.map