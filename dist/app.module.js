"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const agent_module_1 = require("./modules/agent/agent.module");
const tenant_module_1 = require("./modules/tenant/tenant.module");
const auth_module_1 = require("./modules/auth/auth.module");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./modules/auth/jwt-auth.guard");
const ormconfig_1 = require("./config/ormconfig");
const customer_module_1 = require("./modules/customer/customer.module");
const phone_number_module_1 = require("./modules/phone-number/phone-number.module");
const project_module_1 = require("./modules/project/project.module");
const call_module_1 = require("./modules/call/call.module");
const role_module_1 = require("./modules/role/role.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot(ormconfig_1.dataSourceOptions),
            agent_module_1.AgentModule,
            tenant_module_1.TenantModule,
            auth_module_1.AuthModule,
            customer_module_1.CustomerModule,
            phone_number_module_1.PhoneNumberModule,
            project_module_1.ProjectModule,
            call_module_1.CallModule,
            role_module_1.RoleModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService,
            {
                provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard
            }],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map