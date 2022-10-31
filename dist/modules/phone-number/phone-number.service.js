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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneNumberService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_number_entity_1 = require("./entities/customer-number.entity");
const phone_number_entity_1 = require("./entities/phone-number.entity");
let PhoneNumberService = class PhoneNumberService {
    constructor(phoneRepository, customerNumberRepository) {
        this.phoneRepository = phoneRepository;
        this.customerNumberRepository = customerNumberRepository;
    }
    async createCusNumberRecord(customerID, phoneID) {
        const createAt = new Date();
        const cusNumber = await this.customerNumberRepository.create({
            phoneNumberID: phoneID,
            customerID: customerID,
            createAt: createAt,
            updatedAt: createAt
        });
        return this.customerNumberRepository.save(cusNumber);
    }
    async createPhoneNumberRecord(phoneNumber) {
        const createAt = new Date();
        const phone = await this.phoneRepository.create({
            number: phoneNumber,
            createAt: createAt,
            updatedAt: createAt
        });
        return this.phoneRepository.save(phone);
    }
    async getPhoneInforByNumber(phone_number) {
        try {
            return this.phoneRepository.findOne({
                where: {
                    number: phone_number
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getCustomerPhoneInforByPhoneID(phoneID) {
        try {
            return this.customerNumberRepository.findOne({
                where: {
                    phoneNumberID: phoneID
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getPhoneNumberById(id) {
        try {
            return this.phoneRepository.findOneByOrFail({ id });
        }
        catch (error) {
            throw error;
        }
    }
    async getCustomerPhoneByCustomerID(customerID) {
        try {
            return this.customerNumberRepository.find({
                where: {
                    customerID: customerID
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
};
PhoneNumberService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(phone_number_entity_1.PhoneNumber)),
    __param(1, (0, typeorm_1.InjectRepository)(customer_number_entity_1.CustomerNumber)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PhoneNumberService);
exports.PhoneNumberService = PhoneNumberService;
//# sourceMappingURL=phone-number.service.js.map