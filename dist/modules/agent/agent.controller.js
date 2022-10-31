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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const page_option_dto_1 = require("../../common/dto/page-option.dto");
const agent_service_1 = require("./agent.service");
const create_agent_dto_1 = require("./dto/create-agent.dto");
const update_agent_dto_1 = require("./dto/update-agent.dto");
let AgentController = class AgentController {
    constructor(agentService) {
        this.agentService = agentService;
    }
    getListAgent(pageOptionsDto) {
        return this.agentService.getListAgent(pageOptionsDto);
    }
    getById(id) {
        return this.agentService.getById(+id);
    }
    create(tenantID, createAgentDto) {
        return this.agentService.createAgent(tenantID, createAgentDto);
    }
    update(id, tenantID, updateAgentDto) {
        return this.agentService.update(+id, tenantID, updateAgentDto);
    }
    remove(id, tenantID) {
        return this.agentService.remove(+id, tenantID);
    }
};
__decorate([
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad request' }),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_option_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], AgentController.prototype, "getListAgent", null);
__decorate([
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad request' }),
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/agent.entity").Agent }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AgentController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad request' }),
    (0, common_1.Post)(''),
    openapi.ApiResponse({ status: 201, type: require("./entities/agent.entity").Agent }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_agent_dto_1.CreateAgentDto]),
    __metadata("design:returntype", void 0)
], AgentController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: 'Agent update successfully' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad request' }),
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('tenant_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_agent_dto_1.UpdateAgentDto]),
    __metadata("design:returntype", void 0)
], AgentController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: 'Agent delete successfully' }),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('tenant_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AgentController.prototype, "remove", null);
AgentController = __decorate([
    (0, swagger_1.ApiTags)('Agents'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)(':tenantID/agents'),
    __metadata("design:paramtypes", [agent_service_1.AgentService])
], AgentController);
exports.AgentController = AgentController;
//# sourceMappingURL=agent.controller.js.map