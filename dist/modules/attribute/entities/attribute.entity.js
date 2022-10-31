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
exports.Attribute = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const project_attribute_entity_1 = require("./project-attribute.entity");
let Attribute = class Attribute {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, attributeName: { required: true, type: () => String }, projectAttribute: { required: true, type: () => [require("./project-attribute.entity").ProjectAttribute] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Attribute.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "attribute_name" }),
    __metadata("design:type", String)
], Attribute.prototype, "attributeName", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => project_attribute_entity_1.ProjectAttribute, (projectAttribute) => projectAttribute.attribute),
    __metadata("design:type", Array)
], Attribute.prototype, "projectAttribute", void 0);
Attribute = __decorate([
    (0, typeorm_1.Entity)()
], Attribute);
exports.Attribute = Attribute;
//# sourceMappingURL=attribute.entity.js.map