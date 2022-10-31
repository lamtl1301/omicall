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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryCall = void 0;
const openapi = require("@nestjs/swagger");
const base_entity_1 = require("../../../common/base.entity");
const typeorm_1 = require("typeorm");
const file_entity_1 = require("./file.entity");
let HistoryCall = class HistoryCall extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { agentID: { required: true, type: () => Number }, fileID: { required: true, type: () => Number }, projectNumberID: { required: true, type: () => Number }, customerNumberID: { required: true, type: () => Number }, timeStartToAnswer: { required: true, type: () => Number }, duration: { required: true, type: () => Number }, disposition: { required: true, type: () => String }, file: { required: true, type: () => [require("./file.entity").FileRecord] } };
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: "agent_id" }),
    __metadata("design:type", Number)
], HistoryCall.prototype, "agentID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "file_id" }),
    __metadata("design:type", Number)
], HistoryCall.prototype, "fileID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "project_number_id" }),
    __metadata("design:type", Number)
], HistoryCall.prototype, "projectNumberID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "customer_number_id" }),
    __metadata("design:type", Number)
], HistoryCall.prototype, "customerNumberID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "time_start_to_answer" }),
    __metadata("design:type", Number)
], HistoryCall.prototype, "timeStartToAnswer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "duration" }),
    __metadata("design:type", Number)
], HistoryCall.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "disposition" }),
    __metadata("design:type", String)
], HistoryCall.prototype, "disposition", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => file_entity_1.FileRecord, (file) => file.historyCall),
    (0, typeorm_1.JoinColumn)({ name: "file_id" }),
    __metadata("design:type", Array)
], HistoryCall.prototype, "file", void 0);
HistoryCall = __decorate([
    (0, typeorm_1.Entity)()
], HistoryCall);
exports.HistoryCall = HistoryCall;
//# sourceMappingURL=call.entity.js.map