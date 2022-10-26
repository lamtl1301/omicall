import { BaseAttribute } from 'src/common/base-attribute.entity';
import { Agent } from 'src/modules/agent/entities/agent.entity';
import { Project } from 'src/modules/project/entities/project.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Attribute } from './attribute.entity';

@Entity()
export class AgentAttribute extends BaseAttribute{

    @Column({name: "agent_id"})
    agentID: number;
    
    @Column({name: "display_index"})
    displayIndex: number

    @ManyToOne(type => Attribute, (attribute) => attribute.projectAttribute)
    @JoinColumn({name: "attribute_id"})
    attribute: Attribute

    @ManyToOne(type => Agent, (agent) => agent.agentAttribute)
    @JoinColumn({name: "agent_id"})
    agent: Agent
}
