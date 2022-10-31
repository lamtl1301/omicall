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
exports.CustomerNumber = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const base_entity_1 = require("../../../common/base.entity");
const customer_entity_1 = require("../../customer/entities/customer.entity");
const typeorm_1 = require("typeorm");
const phone_number_entity_1 = require("./phone-number.entity");
let CustomerNumber = class CustomerNumber extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { phoneNumberID: { required: true, type: () => Number }, customerID: { required: true, type: () => Number }, isDeleted: { required: true, type: () => Boolean } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ name: "phone_number_id" }),
    __metadata("design:type", Number)
], CustomerNumber.prototype, "phoneNumberID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ name: "customer_id" }),
    __metadata("design:type", Number)
], CustomerNumber.prototype, "customerID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false, name: "is_deleted" }),
    __metadata("design:type", Boolean)
], CustomerNumber.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.ManyToOne)(type => phone_number_entity_1.PhoneNumber, (phoneNumber) => phoneNumber.customerNumber),
    (0, typeorm_1.JoinColumn)({ name: "" }),
    __metadata("design:type", phone_number_entity_1.PhoneNumber)
], CustomerNumber.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.ManyToOne)(type => customer_entity_1.Customer, (customer) => customer.customerNumber),
    (0, typeorm_1.JoinColumn)({ name: "customer_id" }),
    __metadata("design:type", customer_entity_1.Customer)
], CustomerNumber.prototype, "customer", void 0);
CustomerNumber = __decorate([
    (0, typeorm_1.Entity)()
], CustomerNumber);
exports.CustomerNumber = CustomerNumber;
//# sourceMappingURL=customer-number.entity.js.map