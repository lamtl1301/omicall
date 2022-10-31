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
exports.BaseAttribute = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let BaseAttribute = class BaseAttribute {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, attributeID: { required: true, type: () => Number }, value: { required: true, type: () => String }, isDeleted: { required: true, type: () => Boolean } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], BaseAttribute.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "attribute_id" }),
    __metadata("design:type", Number)
], BaseAttribute.prototype, "attributeID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "value" }),
    __metadata("design:type", String)
], BaseAttribute.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_deleted" }),
    __metadata("design:type", Boolean)
], BaseAttribute.prototype, "isDeleted", void 0);
BaseAttribute = __decorate([
    (0, typeorm_1.Entity)()
], BaseAttribute);
exports.BaseAttribute = BaseAttribute;
//# sourceMappingURL=base-attribute.entity.js.map