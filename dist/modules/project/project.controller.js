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
exports.ProjectController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const create_project_dto_1 = require("./dto/create-project.dto");
const update_project_dto_1 = require("./dto/update-project.dto");
const swagger_1 = require("@nestjs/swagger");
const page_option_dto_1 = require("../../common/dto/page-option.dto");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    create(createProjectDto, agentID) {
        return this.projectService.create(createProjectDto, agentID);
    }
    async getListProject(pageOptionsDto) {
        return this.projectService.getListProject(pageOptionsDto);
    }
    findOne(id, tenant_id) {
        return this.projectService.getById(id, tenant_id);
    }
    update(tenant_id, id, updateProjectDto) {
        return this.projectService.update(tenant_id, id, updateProjectDto);
    }
    remove(tenant_id, id) {
        return this.projectService.remove(id, tenant_id);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto, Number]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_option_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getListProject", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/project.entity").Project }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('tenant_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('tenant_id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('tenant_id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "remove", null);
ProjectController = __decorate([
    (0, swagger_1.ApiTags)('Project'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)(':tenantID/project'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map