import { BaseEntity } from 'src/common/base.entity';
import { CustomerNumber } from './customer-number.entity';
export declare class PhoneNumber extends BaseEntity {
    number: string;
    provider: string;
    providerType: string;
    numberType: string;
    nation: string;
    customerNumber: CustomerNumber[];
}
