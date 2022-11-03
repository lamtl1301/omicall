"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallModule = void 0;
const common_1 = require("@nestjs/common");
const call_service_1 = require("./call.service");
const call_controller_1 = require("./call.controller");
const typeorm_1 = require("@nestjs/typeorm");
const call_entity_1 = require("./entities/call.entity");
const file_entity_1 = require("./entities/file.entity");
const file_service_1 = require("./file/file.service");
const agent_module_1 = require("../agent/agent.module");
const file_module_1 = require("./file/file.module");
const config_1 = require("@nestjs/config");
let CallModule = class CallModule {
};
CallModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => agent_module_1.AgentModule),
            (0, common_1.forwardRef)(() => file_module_1.FileModule),
            (0, common_1.forwardRef)(() => config_1.ConfigModule),
            typeorm_1.TypeOrmModule.forFeature([call_entity_1.HistoryCall, file_entity_1.FileRecord]),
        ],
        controllers: [call_controller_1.CallController],
        providers: [call_service_1.CallService, file_service_1.FileService, config_1.ConfigService],
    })
], CallModule);
exports.CallModule = CallModule;
//# sourceMappingURL=call.module.js.map