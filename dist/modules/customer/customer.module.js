"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModule = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("./customer.service");
const customer_controller_1 = require("./customer.controller");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("./entities/customer.entity");
const project_entity_1 = require("../project/entities/project.entity");
const customer_number_entity_1 = require("../phone-number/entities/customer-number.entity");
const phone_number_entity_1 = require("../phone-number/entities/phone-number.entity");
const phone_number_module_1 = require("../phone-number/phone-number.module");
const phone_number_service_1 = require("../phone-number/phone-number.service");
let CustomerModule = class CustomerModule {
};
CustomerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([customer_entity_1.Customer, project_entity_1.Project, customer_number_entity_1.CustomerNumber, phone_number_entity_1.PhoneNumber]),
            phone_number_module_1.PhoneNumberModule
        ],
        controllers: [customer_controller_1.CustomerController],
        providers: [customer_service_1.CustomerService, phone_number_service_1.PhoneNumberService],
        exports: [customer_service_1.CustomerService]
    })
], CustomerModule);
exports.CustomerModule = CustomerModule;
//# sourceMappingURL=customer.module.js.map