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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const agent_entity_1 = require("./entities/agent.entity");
const role_entity_1 = require("../role/entities/role.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const pagination_dto_1 = require("../../common/pagination.dto");
const page_meta_dto_1 = require("../../common/page-meta.dto");
const agent_attribute_entity_1 = require("../attribute/entities/agent-attribute.entity");
const attribute_entity_1 = require("../attribute/entities/attribute.entity");
let AgentService = class AgentService {
    constructor(agentRepository, roleRepository, agentAttributeRepository, attributeRepository) {
        this.agentRepository = agentRepository;
        this.roleRepository = roleRepository;
        this.agentAttributeRepository = agentAttributeRepository;
        this.attributeRepository = attributeRepository;
    }
    async createAgent(tenantID, createAgentDto) {
        try {
            const checkAgent = await this.agentRepository.findOne({
                where: {
                    email: createAgentDto.email,
                    tenantID: tenantID
                }
            });
            if (checkAgent) {
                checkAgent.isActived = true;
                checkAgent.isDeleted = false;
                return this.agentRepository.save(checkAgent);
            }
            else {
                const agent = this.agentRepository.create(createAgentDto);
                let password = agent.password;
                if (agent.password.length == 0) {
                    password = Math.random().toString(36).slice(-8);
                }
                else {
                    agent.isFirstLogin = false;
                }
                console.log(password);
                let hashedPassword = await bcrypt_1.default.hash(password, 12);
                agent.password = hashedPassword;
                agent.createAt = new Date();
                agent.updatedAt = new Date();
                return this.agentRepository.save(agent);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getAll() {
        return this.agentRepository;
    }
    async getListAgent(pageOptionsDto) {
        const queryBuilder = this.agentRepository.createQueryBuilder("agent");
        queryBuilder
            .orderBy("agent.createAt", pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take);
        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto });
        return new pagination_dto_1.PageDto(entities, pageMetaDto);
    }
    async getById(id) {
        return this.agentRepository.findOneByOrFail({ id });
    }
    async getByEmail(email) {
        try {
            return this.agentRepository.findOneBy({ email });
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, tenantID, updateAgentDto) {
        try {
            const agent = await this.agentRepository.findOneOrFail({
                where: {
                    tenantID: tenantID,
                    id: id
                }
            });
            if (agent) {
                let message;
                if (updateAgentDto.password.length > 0) {
                    let hashedPassword = await bcrypt_1.default.hash(updateAgentDto.password, 12);
                    agent.password = hashedPassword;
                    agent.isFirstLogin = false;
                    agent.isActived = true;
                    message = "Change Agent password successfully";
                }
                else {
                    agent.fullName = updateAgentDto.fullName;
                    agent.gender = updateAgentDto.gender;
                    updateAgentDto.attribute.forEach(async (attributeElement) => {
                        if (attributeElement.id === null || typeof (attributeElement.id) == null) {
                            const newAttribute = await this.attributeRepository.create({
                                id: attributeElement.id,
                                attributeName: attributeElement.key
                            });
                            this.agentAttributeRepository.create({
                                attributeID: newAttribute.id,
                                agentID: id,
                                value: attributeElement.value
                            });
                        }
                        else {
                            const agentAttributeRecord = await this.agentAttributeRepository.findOne({
                                where: {
                                    id: attributeElement.id,
                                    agentID: id
                                }
                            });
                            if (agentAttributeRecord) {
                                agentAttributeRecord.value = attributeElement.value;
                                const attributeRecord = await this.attributeRepository.findOne({
                                    where: {
                                        id: agentAttributeRecord.attributeID
                                    }
                                });
                                attributeRecord.attributeName = attributeElement.key;
                                this.attributeRepository.save(attributeRecord);
                                this.agentAttributeRepository.save(agentAttributeRecord);
                            }
                        }
                    });
                    message = "Agent update successfully";
                }
                agent.updatedAt = new Date();
                this.agentRepository.update(id, agent);
                return message;
            }
            else {
                throw new common_1.NotFoundException();
            }
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id, tenantID) {
        try {
            const agent = await this.agentRepository.findOneOrFail({
                where: {
                    tenantID: tenantID,
                    id: id
                }
            });
            if (agent) {
                agent.isDeleted = true;
                agent.isActived = false;
                this.agentRepository.update(id, agent);
                return "Agent delete successfully";
            }
            else {
                throw new common_1.NotFoundException();
            }
        }
        catch (error) {
            throw error;
        }
    }
};
AgentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(agent_entity_1.Agent)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(agent_attribute_entity_1.AgentAttribute)),
    __param(3, (0, typeorm_1.InjectRepository)(attribute_entity_1.Attribute)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AgentService);
exports.AgentService = AgentService;
//# sourceMappingURL=agent.service.js.map