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
exports.FileRecord = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const call_entity_1 = require("./call.entity");
let FileRecord = class FileRecord {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, fileName: { required: true, type: () => String }, fileTypeID: { required: true, type: () => Number }, recordSeconds: { required: true, type: () => Number }, isDeleted: { required: true, type: () => Boolean }, historyCall: { required: true, type: () => require("./call.entity").HistoryCall } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FileRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "file_name" }),
    __metadata("design:type", String)
], FileRecord.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "file_type_id" }),
    __metadata("design:type", Number)
], FileRecord.prototype, "fileTypeID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "record_seconds" }),
    __metadata("design:type", Number)
], FileRecord.prototype, "recordSeconds", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_deleted", default: "false" }),
    __metadata("design:type", Boolean)
], FileRecord.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => call_entity_1.HistoryCall, (historyCall) => historyCall.file),
    __metadata("design:type", call_entity_1.HistoryCall)
], FileRecord.prototype, "historyCall", void 0);
FileRecord = __decorate([
    (0, typeorm_1.Entity)()
], FileRecord);
exports.FileRecord = FileRecord;
//# sourceMappingURL=file.entity.js.map