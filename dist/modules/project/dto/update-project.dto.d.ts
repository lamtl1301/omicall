import { Attribute } from "src/common/attribute.type";
export declare class UpdateProjectDto {
    tenantID: string;
    projectName: string;
    domain: string;
    description: string;
    isEnabled: boolean;
    attribute: Attribute[];
}
