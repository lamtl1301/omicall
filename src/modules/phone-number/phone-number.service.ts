import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerNumber } from './entities/customer-number.entity';
import { PhoneNumber } from './entities/phone-number.entity';

@Injectable()
export class PhoneNumberService {
    constructor(
        @InjectRepository(PhoneNumber)
        private readonly phoneRepository: Repository<PhoneNumber>,
        @InjectRepository(CustomerNumber)
        private readonly customerNumberRepository: Repository<CustomerNumber>,
    ) { }
    
    async createCusNumberRecord(customerID: number, phoneID: number) {
        const createAt = new Date()
        const cusNumber = await this.customerNumberRepository.create({
            phoneNumberID: phoneID,
            customerID: customerID,
            createAt: createAt,
            updatedAt: createAt
        });
        return this.customerNumberRepository.save(cusNumber)
    }

    async createPhoneNumberRecord(phoneNumber: string) {
        const createAt = new Date();
        const phone = await this.phoneRepository.create({
            number: phoneNumber,
            createAt: createAt,
            updatedAt: createAt
        })
        return this.phoneRepository.save(phone)
    }


    async getPhoneInforByNumber(phone_number: string) {
        try {
            return this.phoneRepository.findOne({
                where: {
                    number: phone_number
                }
            })
        } catch (error) {
            throw error
        }
    }
    async getCustomerPhoneInforByPhoneID(phoneID: number){
        try {
            return this.customerNumberRepository.findOne({
                where: {
                    phoneNumberID: phoneID
                }
            })

        } catch (error) {
            throw error
        }
    }
    async getPhoneNumberById(id: number) {
        try {
            return this.phoneRepository.findOneByOrFail({ id })
        } catch (error) {
            throw error
        }
    }
    async getCustomerPhoneByCustomerID(customerID: number){
        try {
            return this.customerNumberRepository.find({
                where: {
                    customerID: customerID
                }
            })
        } catch (error) {
            throw error;
        }
    }
}
