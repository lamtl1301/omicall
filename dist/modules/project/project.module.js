"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const project_controller_1 = require("./project.controller");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("./entities/project.entity");
const customer_entity_1 = require("../customer/entities/customer.entity");
const tenant_entity_1 = require("../tenant/entities/tenant.entity");
const agent_entity_1 = require("../agent/entities/agent.entity");
const project_attribute_entity_1 = require("../attribute/entities/project-attribute.entity");
const attribute_entity_1 = require("../attribute/entities/attribute.entity");
const role_service_1 = require("../role/role.service");
const role_module_1 = require("../role/role.module");
const agent_service_1 = require("../agent/agent.service");
const agent_module_1 = require("../agent/agent.module");
const attribute_module_1 = require("../attribute/attribute.module");
const role_entity_1 = require("../role/entities/role.entity");
const agent_attribute_entity_1 = require("../attribute/entities/agent-attribute.entity");
const agent_role_entity_1 = require("../role/entities/agent-role.entity");
let ProjectModule = class ProjectModule {
};
ProjectModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_entity_1.Project, customer_entity_1.Customer, tenant_entity_1.Tenant, agent_entity_1.Agent, project_attribute_entity_1.ProjectAttribute, attribute_entity_1.Attribute, role_entity_1.Role, agent_attribute_entity_1.AgentAttribute, agent_role_entity_1.AgentRole]),
            (0, common_1.forwardRef)(() => role_module_1.RoleModule),
            (0, common_1.forwardRef)(() => agent_module_1.AgentModule),
            (0, common_1.forwardRef)(() => attribute_module_1.AttributeModule),
        ],
        controllers: [project_controller_1.ProjectController],
        providers: [project_service_1.ProjectService, agent_service_1.AgentService, role_service_1.RoleService],
        exports: [project_service_1.ProjectService]
    })
], ProjectModule);
exports.ProjectModule = ProjectModule;
//# sourceMappingURL=project.module.js.map