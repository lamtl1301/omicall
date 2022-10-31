import { BaseEntity } from 'src/common/base.entity';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { PhoneNumber } from './phone-number.entity';
export declare class CustomerNumber extends BaseEntity {
    phoneNumberID: number;
    customerID: number;
    isDeleted: boolean;
    phoneNumber: PhoneNumber;
    customer: Customer;
}
