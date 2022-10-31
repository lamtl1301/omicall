"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentModule = void 0;
const common_1 = require("@nestjs/common");
const agent_service_1 = require("./agent.service");
const agent_controller_1 = require("./agent.controller");
const typeorm_1 = require("@nestjs/typeorm");
const agent_entity_1 = require("./entities/agent.entity");
const role_entity_1 = require("../role/entities/role.entity");
const token_entity_1 = require("../auth/entities/token.entity");
const agent_attribute_entity_1 = require("../attribute/entities/agent-attribute.entity");
const attribute_entity_1 = require("../attribute/entities/attribute.entity");
const role_module_1 = require("../role/role.module");
const project_module_1 = require("../project/project.module");
const role_service_1 = require("../role/role.service");
const attribute_module_1 = require("../attribute/attribute.module");
const agent_role_entity_1 = require("../role/entities/agent-role.entity");
const project_service_1 = require("../project/project.service");
const project_entity_1 = require("../project/entities/project.entity");
const project_attribute_entity_1 = require("../attribute/entities/project-attribute.entity");
let AgentModule = class AgentModule {
};
AgentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([agent_entity_1.Agent, role_entity_1.Role, token_entity_1.Token, agent_attribute_entity_1.AgentAttribute, attribute_entity_1.Attribute, agent_role_entity_1.AgentRole, project_entity_1.Project, project_attribute_entity_1.ProjectAttribute]),
            (0, common_1.forwardRef)(() => role_module_1.RoleModule),
            (0, common_1.forwardRef)(() => project_module_1.ProjectModule),
            (0, common_1.forwardRef)(() => attribute_module_1.AttributeModule),
        ],
        controllers: [agent_controller_1.AgentController],
        providers: [agent_service_1.AgentService, role_service_1.RoleService, project_service_1.ProjectService],
        exports: [agent_service_1.AgentService]
    })
], AgentModule);
exports.AgentModule = AgentModule;
//# sourceMappingURL=agent.module.js.map