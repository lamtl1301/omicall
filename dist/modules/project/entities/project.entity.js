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
exports.Project = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const base_entity_1 = require("../../../common/base.entity");
const role_entity_1 = require("../../role/entities/role.entity");
const project_attribute_entity_1 = require("../../attribute/entities/project-attribute.entity");
const customer_entity_1 = require("../../customer/entities/customer.entity");
const tenant_entity_1 = require("../../tenant/entities/tenant.entity");
const typeorm_1 = require("typeorm");
let Project = class Project extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { projectName: { required: true, type: () => String }, domain: { required: true, type: () => String }, description: { required: true, type: () => String }, isDeleted: { required: true, type: () => Boolean }, isEnabled: { required: true, type: () => Boolean }, tenantID: { required: true, type: () => String } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ name: "project_name" }),
    __metadata("design:type", String)
], Project.prototype, "projectName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "domain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false, name: "is_deleted" }),
    __metadata("design:type", Boolean)
], Project.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: true, name: "is_enabled" }),
    __metadata("design:type", Boolean)
], Project.prototype, "isEnabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ name: "tenant_id" }),
    __metadata("design:type", String)
], Project.prototype, "tenantID", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.ManyToOne)(type => tenant_entity_1.Tenant, (tenant) => tenant.project),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id' }),
    __metadata("design:type", tenant_entity_1.Tenant)
], Project.prototype, "tenant", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.OneToMany)(type => customer_entity_1.Customer, (customer) => customer.project),
    __metadata("design:type", Array)
], Project.prototype, "customer", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.OneToMany)(type => project_attribute_entity_1.ProjectAttribute, (projectAttribute) => projectAttribute.project),
    __metadata("design:type", Array)
], Project.prototype, "projectAttribute", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.OneToMany)(type => role_entity_1.Role, (role) => role.project),
    __metadata("design:type", Array)
], Project.prototype, "role", void 0);
Project = __decorate([
    (0, typeorm_1.Entity)()
], Project);
exports.Project = Project;
//# sourceMappingURL=project.entity.js.map