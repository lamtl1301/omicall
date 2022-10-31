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
exports.CallService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const agent_service_1 = require("../agent/agent.service");
const call_entity_1 = require("./entities/call.entity");
const file_type_entity_1 = require("./entities/file-type.entity");
const file_entity_1 = require("./entities/file.entity");
let CallService = class CallService {
    constructor(historyRepository, fileTypeRepository, fileRecordRepository, agentService) {
        this.historyRepository = historyRepository;
        this.fileTypeRepository = fileTypeRepository;
        this.fileRecordRepository = fileRecordRepository;
        this.agentService = agentService;
    }
    async create(createCallDto) {
    }
    findAll() {
    }
    findOne(id) {
        return `This action returns a #${id} call`;
    }
    update(id, updateCallDto) {
        return `This action updates a #${id} call`;
    }
    remove(id) {
        return `This action removes a #${id} call`;
    }
};
CallService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(call_entity_1.HistoryCall)),
    __param(1, (0, typeorm_1.InjectRepository)(file_type_entity_1.FileType)),
    __param(2, (0, typeorm_1.InjectRepository)(file_entity_1.FileRecord)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        agent_service_1.AgentService])
], CallService);
exports.CallService = CallService;
//# sourceMappingURL=call.service.js.map