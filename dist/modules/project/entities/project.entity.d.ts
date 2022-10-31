import { BaseEntity } from "src/common/base.entity";
import { Role } from "src/modules/role/entities/role.entity";
import { ProjectAttribute } from "src/modules/attribute/entities/project-attribute.entity";
import { Customer } from "src/modules/customer/entities/customer.entity";
import { Tenant } from "src/modules/tenant/entities/tenant.entity";
export declare class Project extends BaseEntity {
    projectName: string;
    domain: string;
    description: string;
    isDeleted: boolean;
    isEnabled: boolean;
    tenantID: string;
    tenant: Tenant;
    customer: Customer[];
    projectAttribute: ProjectAttribute[];
    role: Role[];
}
