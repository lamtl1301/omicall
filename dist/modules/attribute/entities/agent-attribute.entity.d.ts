import { BaseAttribute } from 'src/common/base-attribute.entity';
import { Agent } from 'src/modules/agent/entities/agent.entity';
import { Attribute } from './attribute.entity';
export declare class AgentAttribute extends BaseAttribute {
    agentID: number;
    displayIndex: number;
    attribute: Attribute;
    agent: Agent;
}
