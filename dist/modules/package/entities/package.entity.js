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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const base_entity_1 = require("../../../common/base.entity");
const typeorm_1 = require("typeorm");
let Package = class Package extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { service_name: { required: true, type: () => String }, description: { required: true, type: () => String }, price: { required: true, type: () => Number }, customerNum: { required: true, type: () => Number }, staffNum: { required: true, type: () => Number }, packageExpire: { required: true, type: () => Number }, expireUnit: { required: true, type: () => String }, isDeleted: { required: true, type: () => Boolean }, isEnabled: { required: true, type: () => Boolean } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ name: "service_name" }),
    __metadata("design:type", String)
], Package.prototype, "service_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true, name: "description" }),
    __metadata("design:type", String)
], Package.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true, type: "float", name: "price" }),
    __metadata("design:type", Number)
], Package.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true, name: "customer_num" }),
    __metadata("design:type", Number)
], Package.prototype, "customerNum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true, name: "staff_num" }),
    __metadata("design:type", Number)
], Package.prototype, "staffNum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true, name: "package_expire" }),
    __metadata("design:type", Number)
], Package.prototype, "packageExpire", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true, name: "expire_unit" }),
    __metadata("design:type", String)
], Package.prototype, "expireUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false, name: "is_deleted" }),
    __metadata("design:type", Boolean)
], Package.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: true, name: "is_enabled" }),
    __metadata("design:type", Boolean)
], Package.prototype, "isEnabled", void 0);
Package = __decorate([
    (0, typeorm_1.Entity)()
], Package);
exports.Package = Package;
//# sourceMappingURL=package.entity.js.map