import { BaseEntity } from 'src/common/base.entity';
import { Agent } from 'src/modules/agent/entities/agent.entity';
import { Role } from './role.entity';
export declare class AgentRole extends BaseEntity {
    agentID: number;
    roleID: number;
    agent: Agent;
    role: Role;
}
