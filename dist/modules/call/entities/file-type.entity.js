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
exports.FileType = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const file_entity_1 = require("./file.entity");
let FileType = class FileType {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, typeName: { required: true, type: () => String }, description: { required: true, type: () => String }, file: { required: true, type: () => [require("./file.entity").FileRecord] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FileType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "type_name" }),
    __metadata("design:type", String)
], FileType.prototype, "typeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "description" }),
    __metadata("design:type", String)
], FileType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => file_entity_1.FileRecord, (fileRecord) => fileRecord.fileType),
    __metadata("design:type", Array)
], FileType.prototype, "file", void 0);
FileType = __decorate([
    (0, typeorm_1.Entity)()
], FileType);
exports.FileType = FileType;
//# sourceMappingURL=file-type.entity.js.map