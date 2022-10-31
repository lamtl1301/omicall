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
exports.Agent = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const base_entity_1 = require("../../../common/base.entity");
const agent_attribute_entity_1 = require("../../attribute/entities/agent-attribute.entity");
const token_entity_1 = require("../../auth/entities/token.entity");
const agent_role_entity_1 = require("../../role/entities/agent-role.entity");
const tenant_entity_1 = require("../../tenant/entities/tenant.entity");
const typeorm_1 = require("typeorm");
let Agent = class Agent extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { password: { required: true, type: () => String }, email: { required: true, type: () => String }, fullName: { required: true, type: () => String }, isDeleted: { required: true, type: () => Boolean }, isFirstLogin: { required: true, type: () => Boolean }, isActived: { required: true, type: () => Boolean }, isOwner: { required: true, type: () => Boolean }, gender: { required: true, type: () => String }, avatar: { required: true, type: () => String }, tagID: { required: true, type: () => Number }, tenantID: { required: true, type: () => String }, tenant: { required: true, type: () => require("../../tenant/entities/tenant.entity").Tenant } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Agent.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Agent.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true, name: "full_name" }),
    __metadata("design:type", String)
], Agent.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false, name: "is_deleted" }),
    __metadata("design:type", Boolean)
], Agent.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: true, name: "is_first_login" }),
    __metadata("design:type", Boolean)
], Agent.prototype, "isFirstLogin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false, name: "is_actived" }),
    __metadata("design:type", Boolean)
], Agent.prototype, "isActived", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false, name: "is_owner" }),
    __metadata("design:type", Boolean)
], Agent.prototype, "isOwner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Agent.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Agent.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true, name: "tag_id" }),
    __metadata("design:type", Number)
], Agent.prototype, "tagID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true, name: "tenant_id" }),
    __metadata("design:type", String)
], Agent.prototype, "tenantID", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.OneToMany)(type => agent_role_entity_1.AgentRole, (aRole) => aRole.agent),
    __metadata("design:type", Array)
], Agent.prototype, "agentRole", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.OneToMany)(type => token_entity_1.Token, (token) => token.agent),
    __metadata("design:type", Array)
], Agent.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => tenant_entity_1.Tenant, (tenant) => tenant.Agent),
    (0, typeorm_1.JoinColumn)({ name: "tenant_id" }),
    __metadata("design:type", tenant_entity_1.Tenant)
], Agent.prototype, "tenant", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.OneToMany)(type => agent_attribute_entity_1.AgentAttribute, (projectAttribute) => projectAttribute.agent),
    __metadata("design:type", Array)
], Agent.prototype, "agentAttribute", void 0);
Agent = __decorate([
    (0, typeorm_1.Entity)('Agent')
], Agent);
exports.Agent = Agent;
//# sourceMappingURL=agent.entity.js.map