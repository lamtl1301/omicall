import { ApiHideProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/base.entity';
import { Agent } from 'src/modules/agent/entities/agent.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class AgentRole extends BaseEntity{

    @Column({name: "agent_id"})
    agentID: number;

    @Column({name:"role_id"})
    roleID: number

    @ApiHideProperty()
    @ManyToOne(type => Agent, (agent) => agent.agentRole)
    @JoinColumn({name: "agent_id"})
    agent: Agent

    @ApiHideProperty()
    @ManyToOne(type => Role, (role) => role.agentRole)
    @JoinColumn({name: "role_id"})
    role: Role
}
