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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const page_meta_dto_1 = require("../../common/page-meta.dto");
const pagination_dto_1 = require("../../common/pagination.dto");
const typeorm_2 = require("typeorm");
const agent_service_1 = require("../agent/agent.service");
const attribute_entity_1 = require("../attribute/entities/attribute.entity");
const project_attribute_entity_1 = require("../attribute/entities/project-attribute.entity");
const role_service_1 = require("../role/role.service");
const project_entity_1 = require("./entities/project.entity");
let ProjectService = class ProjectService {
    constructor(projectRepository, projectAttributeRepository, attributeRepository, agentService, roleService) {
        this.projectRepository = projectRepository;
        this.projectAttributeRepository = projectAttributeRepository;
        this.attributeRepository = attributeRepository;
        this.agentService = agentService;
        this.roleService = roleService;
    }
    async create(createProjectDto, agentID) {
        console.log(createProjectDto.tenantID);
        try {
            const agent = await this.agentService.getById(agentID);
            if (agent.isOwner) {
                const newProject = this.projectRepository.create({
                    projectName: createProjectDto.projectName,
                    pbx_domain: createProjectDto.pbx_domain,
                    description: createProjectDto.description,
                });
                const listAttribute = createProjectDto.attribute;
                listAttribute.forEach(async (attributeElement) => {
                    const newAttribute = await this.attributeRepository.create({
                        attributeName: attributeElement.key
                    });
                    await this.projectAttributeRepository.create({
                        attributeID: newAttribute.id,
                        projectID: newProject.id,
                        value: attributeElement.value
                    });
                });
                const time = new Date();
                newProject.updatedAt = time;
                newProject.createAt = time;
                this.projectRepository.save(newProject);
            }
            else {
                throw new common_1.ForbiddenException('Access denied');
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getListProject(tenantID, pageOptionsDto) {
        const queryBuilder = this.projectRepository.createQueryBuilder("project");
        queryBuilder
            .where("project.tenant_id = :q", { q: tenantID })
            .orderBy("project.createAt", pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getMany();
        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto });
        return new pagination_dto_1.PageDto(entities, pageMetaDto);
    }
    async getListProjectOfAgent(agent) {
        const listProject = this.projectRepository.find({
            where: {
                tenantID: agent.tenantID,
            }
        });
        return listProject;
    }
    async getById(projectID, tenantID) {
        try {
            return this.projectRepository.findOne({
                where: {
                    tenantID: tenantID,
                    id: projectID,
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async update(tenantID, id, updateProjectDto) {
        console.log(tenantID);
        const updateProject = await this.getById(id, tenantID);
        try {
            updateProject.projectName = updateProjectDto.projectName;
            updateProject.isEnabled = updateProjectDto.isEnabled;
            updateProjectDto.attribute.forEach(async (attributeElement) => {
                if (attributeElement === null || typeof (attributeElement) == null) {
                    const newAttribute = await this.attributeRepository.create({
                        attributeName: attributeElement.key
                    });
                    await this.projectAttributeRepository.create({
                        attributeID: newAttribute.id,
                        projectID: id,
                        value: attributeElement.value
                    });
                }
                else {
                    const projectAttributeRecord = await this.projectAttributeRepository.findOne({
                        where: {
                            id: attributeElement.id,
                            projectID: id
                        }
                    });
                    projectAttributeRecord.value = attributeElement.value;
                    const attributeRecord = await this.attributeRepository.findOne({
                        where: {
                            id: projectAttributeRecord.attributeID
                        }
                    });
                    attributeRecord.attributeName = attributeElement.key;
                    this.attributeRepository.save(attributeRecord);
                    this.projectAttributeRepository.save(projectAttributeRecord);
                }
            });
            updateProject.updatedAt = new Date();
            return this.projectRepository.save(updateProject);
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id, tenant_id) {
        const project = await this.getById(id, tenant_id);
        try {
            project.isDeleted = true;
            project.isEnabled = false;
            project.updatedAt = new Date();
            return this.projectRepository.update(id, project);
        }
        catch (error) {
            throw error;
        }
    }
};
ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(project_attribute_entity_1.ProjectAttribute)),
    __param(2, (0, typeorm_1.InjectRepository)(attribute_entity_1.Attribute)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        agent_service_1.AgentService,
        role_service_1.RoleService])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map