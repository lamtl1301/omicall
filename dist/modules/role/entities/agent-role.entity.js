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
exports.AgentRole = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const base_entity_1 = require("../../../common/base.entity");
const agent_entity_1 = require("../../agent/entities/agent.entity");
const typeorm_1 = require("typeorm");
const role_entity_1 = require("./role.entity");
let AgentRole = class AgentRole extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { agentID: { required: true, type: () => Number }, roleID: { required: true, type: () => Number } };
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: "agent_id" }),
    __metadata("design:type", Number)
], AgentRole.prototype, "agentID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "role_id" }),
    __metadata("design:type", Number)
], AgentRole.prototype, "roleID", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.ManyToOne)(type => agent_entity_1.Agent, (agent) => agent.agentRole),
    (0, typeorm_1.JoinColumn)({ name: "agent_id" }),
    __metadata("design:type", agent_entity_1.Agent)
], AgentRole.prototype, "agent", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.ManyToOne)(type => role_entity_1.Role, (role) => role.agentRole),
    (0, typeorm_1.JoinColumn)({ name: "role_id" }),
    __metadata("design:type", role_entity_1.Role)
], AgentRole.prototype, "role", void 0);
AgentRole = __decorate([
    (0, typeorm_1.Entity)()
], AgentRole);
exports.AgentRole = AgentRole;
//# sourceMappingURL=agent-role.entity.js.map