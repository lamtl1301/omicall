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
exports.ProjectAttribute = void 0;
const openapi = require("@nestjs/swagger");
const base_attribute_entity_1 = require("../../../common/base-attribute.entity");
const project_entity_1 = require("../../project/entities/project.entity");
const typeorm_1 = require("typeorm");
const attribute_entity_1 = require("./attribute.entity");
let ProjectAttribute = class ProjectAttribute extends base_attribute_entity_1.BaseAttribute {
    static _OPENAPI_METADATA_FACTORY() {
        return { projectID: { required: true, type: () => Number }, displayIndex: { required: true, type: () => Number }, attribute: { required: true, type: () => require("./attribute.entity").Attribute }, project: { required: true, type: () => require("../../project/entities/project.entity").Project } };
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: "project_id" }),
    __metadata("design:type", Number)
], ProjectAttribute.prototype, "projectID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "display_index" }),
    __metadata("design:type", Number)
], ProjectAttribute.prototype, "displayIndex", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => attribute_entity_1.Attribute, (attribute) => attribute.projectAttribute),
    (0, typeorm_1.JoinColumn)({ name: "attribute_id" }),
    __metadata("design:type", attribute_entity_1.Attribute)
], ProjectAttribute.prototype, "attribute", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => project_entity_1.Project, (project) => project.projectAttribute),
    (0, typeorm_1.JoinColumn)({ name: "project_id" }),
    __metadata("design:type", project_entity_1.Project)
], ProjectAttribute.prototype, "project", void 0);
ProjectAttribute = __decorate([
    (0, typeorm_1.Entity)()
], ProjectAttribute);
exports.ProjectAttribute = ProjectAttribute;
//# sourceMappingURL=project-attribute.entity.js.map