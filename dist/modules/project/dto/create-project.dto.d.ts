import { Attribute } from "src/common/attribute.type";
export declare class CreateProjectDto {
    tenantID: string;
    projectName: string;
    pbx_domain: string;
    description: string;
    attribute: Attribute[];
}
