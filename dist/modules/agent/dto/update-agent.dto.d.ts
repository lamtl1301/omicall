import { Attribute } from 'src/common/attribute.type';
export declare class UpdateAgentDto {
    readonly password: string;
    readonly email: string;
    readonly fullName: string;
    readonly gender: string;
    readonly isDeleted: boolean;
    readonly isFirstLogin: boolean;
    readonly isActived: boolean;
    readonly tagID: number;
    readonly roleID: number;
    readonly attribute: Attribute[];
}
