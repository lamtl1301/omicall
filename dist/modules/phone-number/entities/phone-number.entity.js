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
exports.PhoneNumber = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const base_entity_1 = require("../../../common/base.entity");
const typeorm_1 = require("typeorm");
const customer_number_entity_1 = require("./customer-number.entity");
let PhoneNumber = class PhoneNumber extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { number: { required: true, type: () => String }, provider: { required: true, type: () => String }, providerType: { required: true, type: () => String }, numberType: { required: true, type: () => String }, nation: { required: true, type: () => String } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PhoneNumber.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PhoneNumber.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true, name: "provider_type" }),
    __metadata("design:type", String)
], PhoneNumber.prototype, "providerType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true, name: "number_type" }),
    __metadata("design:type", String)
], PhoneNumber.prototype, "numberType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PhoneNumber.prototype, "nation", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.OneToMany)(type => customer_number_entity_1.CustomerNumber, (customerNumber) => customerNumber.phoneNumber),
    __metadata("design:type", Array)
], PhoneNumber.prototype, "customerNumber", void 0);
PhoneNumber = __decorate([
    (0, typeorm_1.Entity)()
], PhoneNumber);
exports.PhoneNumber = PhoneNumber;
//# sourceMappingURL=phone-number.entity.js.map