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
exports.Role = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const base_entity_1 = require("../../../common/base.entity");
const project_entity_1 = require("../../project/entities/project.entity");
const typeorm_1 = require("typeorm");
const agent_role_entity_1 = require("./agent-role.entity");
let Role = class Role extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, isDeleted: { required: true, type: () => Boolean }, isOwner: { required: true, type: () => Boolean }, status: { required: true, type: () => Boolean }, projectID: { required: true, type: () => Number }, permission: { required: true, type: () => Number }, roleLevel: { required: true, type: () => Number }, agentRole: { required: true, type: () => [require("./agent-role.entity").AgentRole] } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false, name: "is_deleted" }),
    __metadata("design:type", Boolean)
], Role.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false, name: "is_owner" }),
    __metadata("design:type", Boolean)
], Role.prototype, "isOwner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({}),
    __metadata("design:type", Boolean)
], Role.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ name: "project_id" }),
    __metadata("design:type", Number)
], Role.prototype, "projectID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Role.prototype, "permission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ name: "role_level" }),
    __metadata("design:type", Number)
], Role.prototype, "roleLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.OneToMany)(type => agent_role_entity_1.AgentRole, (agentRole) => agentRole.role),
    __metadata("design:type", Array)
], Role.prototype, "agentRole", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.ManyToOne)(type => project_entity_1.Project, (project) => project.role),
    (0, typeorm_1.JoinColumn)({ name: "project_id" }),
    __metadata("design:type", project_entity_1.Project)
], Role.prototype, "project", void 0);
Role = __decorate([
    (0, typeorm_1.Entity)('Role')
], Role);
exports.Role = Role;
//# sourceMappingURL=role.entity.js.map