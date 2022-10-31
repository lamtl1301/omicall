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
exports.AgentAttribute = void 0;
const openapi = require("@nestjs/swagger");
const base_attribute_entity_1 = require("../../../common/base-attribute.entity");
const agent_entity_1 = require("../../agent/entities/agent.entity");
const typeorm_1 = require("typeorm");
const attribute_entity_1 = require("./attribute.entity");
let AgentAttribute = class AgentAttribute extends base_attribute_entity_1.BaseAttribute {
    static _OPENAPI_METADATA_FACTORY() {
        return { agentID: { required: true, type: () => Number }, displayIndex: { required: true, type: () => Number }, attribute: { required: true, type: () => require("./attribute.entity").Attribute }, agent: { required: true, type: () => require("../../agent/entities/agent.entity").Agent } };
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: "agent_id" }),
    __metadata("design:type", Number)
], AgentAttribute.prototype, "agentID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "display_index" }),
    __metadata("design:type", Number)
], AgentAttribute.prototype, "displayIndex", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => attribute_entity_1.Attribute, (attribute) => attribute.projectAttribute),
    (0, typeorm_1.JoinColumn)({ name: "attribute_id" }),
    __metadata("design:type", attribute_entity_1.Attribute)
], AgentAttribute.prototype, "attribute", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => agent_entity_1.Agent, (agent) => agent.agentAttribute),
    (0, typeorm_1.JoinColumn)({ name: "agent_id" }),
    __metadata("design:type", agent_entity_1.Agent)
], AgentAttribute.prototype, "agent", void 0);
AgentAttribute = __decorate([
    (0, typeorm_1.Entity)()
], AgentAttribute);
exports.AgentAttribute = AgentAttribute;
//# sourceMappingURL=agent-attribute.entity.js.map