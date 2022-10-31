import { Repository } from 'typeorm';
import { CustomerNumber } from './entities/customer-number.entity';
import { PhoneNumber } from './entities/phone-number.entity';
export declare class PhoneNumberService {
    private readonly phoneRepository;
    private readonly customerNumberRepository;
    constructor(phoneRepository: Repository<PhoneNumber>, customerNumberRepository: Repository<CustomerNumber>);
    createCusNumberRecord(customerID: number, phoneID: number): Promise<CustomerNumber>;
    createPhoneNumberRecord(phoneNumber: string): Promise<PhoneNumber>;
    getPhoneInforByNumber(phone_number: string): Promise<PhoneNumber>;
    getCustomerPhoneInforByPhoneID(phoneID: number): Promise<CustomerNumber>;
    getPhoneNumberById(id: number): Promise<PhoneNumber>;
    getCustomerPhoneByCustomerID(customerID: number): Promise<CustomerNumber[]>;
}
