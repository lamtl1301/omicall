"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneNumberModule = void 0;
const common_1 = require("@nestjs/common");
const phone_number_service_1 = require("./phone-number.service");
const phone_number_controller_1 = require("./phone-number.controller");
const typeorm_1 = require("@nestjs/typeorm");
const phone_number_entity_1 = require("./entities/phone-number.entity");
const customer_number_entity_1 = require("./entities/customer-number.entity");
let PhoneNumberModule = class PhoneNumberModule {
};
PhoneNumberModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([phone_number_entity_1.PhoneNumber, customer_number_entity_1.CustomerNumber])],
        controllers: [phone_number_controller_1.PhoneNumberController],
        providers: [phone_number_service_1.PhoneNumberService],
        exports: [phone_number_service_1.PhoneNumberService]
    })
], PhoneNumberModule);
exports.PhoneNumberModule = PhoneNumberModule;
//# sourceMappingURL=phone-number.module.js.map