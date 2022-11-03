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
exports.Tenant = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const agent_entity_1 = require("../../agent/entities/agent.entity");
const project_entity_1 = require("../../project/entities/project.entity");
const typeorm_1 = require("typeorm");
let Tenant = class Tenant {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, fullName: { required: true, type: () => String }, description: { required: true, type: () => String }, isEnabled: { required: true, type: () => Boolean }, isDeleted: { required: true, type: () => Boolean }, isVihat: { required: true, type: () => Boolean }, nation: { required: true, type: () => String }, language: { required: true, type: () => String } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Tenant.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ name: "full_name" }),
    __metadata("design:type", String)
], Tenant.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tenant.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: true, name: "is_enabled" }),
    __metadata("design:type", Boolean)
], Tenant.prototype, "isEnabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false, name: "is_deleted" }),
    __metadata("design:type", Boolean)
], Tenant.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false, name: "is_Vihat" }),
    __metadata("design:type", Boolean)
], Tenant.prototype, "isVihat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tenant.prototype, "nation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tenant.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.Column)({ nullable: true, name: "create_at" }),
    __metadata("design:type", Date)
], Tenant.prototype, "createAt", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.Column)({ nullable: true, name: "update_at" }),
    __metadata("design:type", Date)
], Tenant.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.OneToMany)(type => agent_entity_1.Agent, (agent) => agent.tenant),
    __metadata("design:type", Array)
], Tenant.prototype, "Agent", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.OneToMany)(type => project_entity_1.Project, (project) => project.tenant),
    __metadata("design:type", Array)
], Tenant.prototype, "project", void 0);
Tenant = __decorate([
    (0, typeorm_1.Entity)()
], Tenant);
exports.Tenant = Tenant;
//# sourceMappingURL=tenant.entity.js.map