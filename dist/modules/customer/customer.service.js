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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const page_meta_dto_1 = require("../../common/page-meta.dto");
const pagination_dto_1 = require("../../common/pagination.dto");
const typeorm_2 = require("typeorm");
const phone_number_service_1 = require("../phone-number/phone-number.service");
const customer_entity_1 = require("./entities/customer.entity");
let CustomerService = class CustomerService {
    constructor(customerRepository, phoneNumberService) {
        this.customerRepository = customerRepository;
        this.phoneNumberService = phoneNumberService;
    }
    async create(createCustomerDto, projectID) {
        try {
            const createAt = new Date();
            createCustomerDto.phoneNumber.forEach(async (phoneElement) => {
                const phoneNumber = await this.phoneNumberService.getPhoneInforByNumber(phoneElement);
                if (phoneNumber) {
                    const cusNumber = await this.phoneNumberService.getCustomerPhoneInforByPhoneID(phoneNumber.id);
                    const customer = await this.customerRepository.findOne({
                        where: {
                            id: cusNumber.customerID,
                            projectID: projectID
                        }
                    });
                    if (customer) {
                        if (cusNumber && cusNumber.isDeleted) {
                            cusNumber.isDeleted = false;
                            cusNumber.createAt = createAt;
                            cusNumber.updatedAt = createAt;
                            return this.customerRepository.save(customer);
                        }
                        else if (cusNumber && !cusNumber.isDeleted) {
                            throw new common_1.BadRequestException('Phone number is existed');
                        }
                        else {
                            const customer = this.customerRepository.create({
                                fullName: createCustomerDto.fullName,
                                email: createCustomerDto.email,
                                projectID: projectID,
                            });
                            return this.customerRepository.save(customer);
                        }
                    }
                    else {
                        const customer = this.customerRepository.create({
                            fullName: createCustomerDto.fullName,
                            email: createCustomerDto.email,
                            projectID: projectID,
                        });
                        this.phoneNumberService.createCusNumberRecord(phoneNumber.id, customer.id);
                        return this.customerRepository.save(customer);
                    }
                }
                else {
                    const customer = this.customerRepository.create({
                        fullName: createCustomerDto.fullName,
                        email: createCustomerDto.email,
                        projectID: projectID,
                    });
                    const newPhoneNumber = await this.phoneNumberService.createPhoneNumberRecord(phoneElement);
                    await this.phoneNumberService.createCusNumberRecord(customer.id, newPhoneNumber.id);
                    return this.customerRepository.save(customer);
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getListCustomer(projectID, pageOptionsDto) {
        const queryBuilder = this.customerRepository.createQueryBuilder("customer");
        queryBuilder
            .where("customer.projectID = :projectID", { projectID })
            .orderBy("customer.createAt", pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take);
        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto });
        return new pagination_dto_1.PageDto(entities, pageMetaDto);
    }
    async getById(id, project_id) {
        try {
            return this.customerRepository.findOneOrFail({
                where: {
                    id: id,
                    projectID: project_id
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, project_id, updateCustomerDto) {
        const customer = await this.getById(id, project_id);
        try {
            customer.email = updateCustomerDto.email;
            customer.fullName = updateCustomerDto.fullName;
            updateCustomerDto.phoneNumber.forEach(phoneElement => {
            });
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id, project_id) {
        const customer = await this.getById(id, project_id);
        try {
            const customerNumber = await this.phoneNumberService.getCustomerPhoneByCustomerID(id);
            customer.isDeleted = true;
            customer.updatedAt = new Date();
            customerNumber.forEach(element => {
                element.updatedAt = new Date();
                element.isDeleted = true;
            });
        }
        catch (error) {
            throw error;
        }
    }
};
CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        phone_number_service_1.PhoneNumberService])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map