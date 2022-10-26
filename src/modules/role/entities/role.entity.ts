import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/base.entity';
import { Project } from 'src/modules/project/entities/project.entity';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Agent } from '../../agent/entities/agent.entity';
import { AgentRole } from './agent-role.entity';

@Entity('Role')
export class Role extends BaseEntity{
    
    @ApiProperty()
    @Column() 
    name: string;

    @ApiProperty()
    @Column({default: false, name:"is_deleted"})
    isDeleted: boolean;

    @ApiProperty()
    @Column({default: false, name:"is_owner"})
    isOwner: boolean;

    @ApiProperty()
    @Column({})
    status: boolean;

    @ApiProperty()
    @Column({name: "project_id"})
    projectID: number


    @ApiProperty()
    @Column()
    permission: number

    @ApiProperty()
    @Column({name: "role_level"})
    roleLevel: number

    @ApiProperty()
    @OneToMany(type => AgentRole, (agentRole) => agentRole.role)
    agentRole: AgentRole[]
    
    @ApiHideProperty()
    @ManyToOne(type => Project, (project) => project.role)
    @JoinColumn({name: "project_id"})
    project: Project
}
