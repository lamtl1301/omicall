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
exports.PackageController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const package_service_1 = require("./package.service");
const create_package_dto_1 = require("./dto/create-package.dto");
const update_package_dto_1 = require("./dto/update-package.dto");
const page_option_dto_1 = require("../../common/dto/page-option.dto");
let PackageController = class PackageController {
    constructor(packageService) {
        this.packageService = packageService;
    }
    create(createPackageDto) {
        return this.packageService.create(createPackageDto);
    }
    async getListPackage(pageOptionsDto) {
        return this.packageService.getListPackage(pageOptionsDto);
    }
    getById(id) {
        return this.packageService.getById(id);
    }
    update(id, updatePackageDto) {
        return this.packageService.update(id, updatePackageDto);
    }
    remove(id) {
        return this.packageService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./entities/package.entity").Package }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_package_dto_1.CreatePackageDto]),
    __metadata("design:returntype", void 0)
], PackageController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_option_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], PackageController.prototype, "getListPackage", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/package.entity").Package }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PackageController.prototype, "getById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_package_dto_1.UpdatePackageDto]),
    __metadata("design:returntype", void 0)
], PackageController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PackageController.prototype, "remove", null);
PackageController = __decorate([
    (0, common_1.Controller)('package'),
    __metadata("design:paramtypes", [package_service_1.PackageService])
], PackageController);
exports.PackageController = PackageController;
//# sourceMappingURL=package.controller.js.map