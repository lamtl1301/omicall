import { BaseEntity } from "src/common/base.entity";
import { AgentAttribute } from "src/modules/attribute/entities/agent-attribute.entity";
import { Token } from "src/modules/auth/entities/token.entity";
import { AgentRole } from "src/modules/role/entities/agent-role.entity";
import { Tenant } from "src/modules/tenant/entities/tenant.entity";
export declare class Agent extends BaseEntity {
    password: string;
    email: string;
    fullName: string;
    isDeleted: boolean;
    isFirstLogin: boolean;
    isActived: boolean;
    isOwner: boolean;
    gender: string;
    avatar: string;
    tagID: number;
    tenantID: string;
    agentRole: AgentRole[];
    token: Token[];
    tenant: Tenant;
    agentAttribute: AgentAttribute[];
}
