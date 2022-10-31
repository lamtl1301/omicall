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
exports.PackageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const page_meta_dto_1 = require("../../common/page-meta.dto");
const pagination_dto_1 = require("../../common/pagination.dto");
const typeorm_2 = require("typeorm");
const package_entity_1 = require("./entities/package.entity");
let PackageService = class PackageService {
    constructor(packageRepository) {
        this.packageRepository = packageRepository;
    }
    create(createPackageDto) {
        try {
            const newPackage = this.packageRepository.create(createPackageDto);
            return this.packageRepository.save(newPackage);
        }
        catch (error) {
            throw error;
        }
    }
    async getListPackage(pageOptionsDto) {
        const queryBuilder = this.packageRepository.createQueryBuilder("package");
        queryBuilder
            .orderBy("package.createAt", pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take);
        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto });
        return new pagination_dto_1.PageDto(entities, pageMetaDto);
    }
    async getById(id) {
        try {
            return this.packageRepository.findOneByOrFail({ id });
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updatePackageDto) {
        try {
            let message;
            const packageUpdate = await this.getById(id);
            if (packageUpdate) {
                packageUpdate.service_name = updatePackageDto.service_name;
                packageUpdate.description = updatePackageDto.description;
                packageUpdate.price = updatePackageDto.price;
                packageUpdate.customerNum = updatePackageDto.customer_num;
                packageUpdate.staffNum = updatePackageDto.staff_num;
                packageUpdate.packageExpire = updatePackageDto.package_expire;
                packageUpdate.expireUnit = updatePackageDto.expire_unit;
                packageUpdate.updatedAt = new Date();
                message = "Package update successfully";
                this.packageRepository.update(id, packageUpdate);
                return message;
            }
            else {
                throw new common_1.NotFoundException();
            }
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        const packageRemove = await this.getById(id);
        try {
            packageRemove.isDeleted = true;
            packageRemove.isEnabled = false;
            this.packageRepository.update(id, packageRemove);
        }
        catch (error) {
            throw error;
        }
    }
};
PackageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(package_entity_1.Package)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PackageService);
exports.PackageService = PackageService;
//# sourceMappingURL=package.service.js.map