"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantModule = void 0;
const common_1 = require("@nestjs/common");
const tenant_service_1 = require("./tenant.service");
const tenant_controller_1 = require("./tenant.controller");
const typeorm_1 = require("@nestjs/typeorm");
const tenant_entity_1 = require("./entities/tenant.entity");
const role_entity_1 = require("../role/entities/role.entity");
const agent_service_1 = require("../agent/agent.service");
const agent_entity_1 = require("../agent/entities/agent.entity");
const agent_attribute_entity_1 = require("../attribute/entities/agent-attribute.entity");
const attribute_entity_1 = require("../attribute/entities/attribute.entity");
const project_attribute_entity_1 = require("../attribute/entities/project-attribute.entity");
const project_service_1 = require("../project/project.service");
const project_entity_1 = require("../project/entities/project.entity");
const customer_entity_1 = require("../customer/entities/customer.entity");
const customer_number_entity_1 = require("../phone-number/entities/customer-number.entity");
const phone_number_entity_1 = require("../phone-number/entities/phone-number.entity");
const project_module_1 = require("../project/project.module");
const role_service_1 = require("../role/role.service");
const agent_role_entity_1 = require("../role/entities/agent-role.entity");
let TenantModule = class TenantModule {
};
TenantModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tenant_entity_1.Tenant, role_entity_1.Role, agent_entity_1.Agent, attribute_entity_1.Attribute, agent_attribute_entity_1.AgentAttribute,
                project_attribute_entity_1.ProjectAttribute, project_entity_1.Project, customer_entity_1.Customer, customer_number_entity_1.CustomerNumber, phone_number_entity_1.PhoneNumber, agent_role_entity_1.AgentRole
            ]),
            (0, common_1.forwardRef)(() => project_module_1.ProjectModule),
        ],
        controllers: [tenant_controller_1.TenantController],
        providers: [tenant_service_1.TenantService, agent_service_1.AgentService, project_service_1.ProjectService, role_service_1.RoleService],
        exports: [tenant_service_1.TenantService]
    })
], TenantModule);
exports.TenantModule = TenantModule;
//# sourceMappingURL=tenant.module.js.map