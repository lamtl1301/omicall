import { BaseEntity } from "src/common/base.entity";
import { CustomerNumber } from "src/modules/phone-number/entities/customer-number.entity";
import { Project } from "src/modules/project/entities/project.entity";
export declare class Customer extends BaseEntity {
    fullName: string;
    projectID: number;
    email: string;
    isDeleted: boolean;
    project: Project;
    customerNumber: CustomerNumber[];
}
