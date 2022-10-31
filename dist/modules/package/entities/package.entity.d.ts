import { BaseEntity } from "src/common/base.entity";
export declare class Package extends BaseEntity {
    service_name: string;
    description: string;
    price: number;
    customerNum: number;
    staffNum: number;
    packageExpire: number;
    expireUnit: string;
    isDeleted: boolean;
    isEnabled: boolean;
}
