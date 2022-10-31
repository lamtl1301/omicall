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
exports.Customer = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const base_entity_1 = require("../../../common/base.entity");
const customer_number_entity_1 = require("../../phone-number/entities/customer-number.entity");
const project_entity_1 = require("../../project/entities/project.entity");
const typeorm_1 = require("typeorm");
let Customer = class Customer extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { fullName: { required: true, type: () => String }, projectID: { required: true, type: () => Number }, email: { required: true, type: () => String }, isDeleted: { required: true, type: () => Boolean } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ name: "full_name" }),
    __metadata("design:type", String)
], Customer.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ name: "project_id" }),
    __metadata("design:type", Number)
], Customer.prototype, "projectID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true, name: "email" }),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false, name: "is_deleted" }),
    __metadata("design:type", Boolean)
], Customer.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.ManyToOne)(type => project_entity_1.Project, (project) => project.customer),
    (0, typeorm_1.JoinColumn)({ name: "project_id" }),
    __metadata("design:type", project_entity_1.Project)
], Customer.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.OneToMany)(type => customer_number_entity_1.CustomerNumber, (customerNumber) => customerNumber.customer),
    __metadata("design:type", Array)
], Customer.prototype, "customerNumber", void 0);
Customer = __decorate([
    (0, typeorm_1.Entity)()
], Customer);
exports.Customer = Customer;
//# sourceMappingURL=customer.entity.js.map