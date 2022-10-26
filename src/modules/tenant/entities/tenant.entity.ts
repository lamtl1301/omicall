import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Agent } from "src/modules/agent/entities/agent.entity";

import { Role } from "src/modules/role/entities/role.entity";
import { Project } from "src/modules/project/entities/project.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity() 
export class Tenant {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: string

    @ApiProperty()
    @Column()
    full_name: string

    @ApiProperty()
    @Column()
    description: string
    
    @ApiProperty()
    @Column({default: true})
    is_enabled: boolean

    @ApiProperty()
    @Column({default: false})
    is_deleted: boolean

    @ApiProperty()
    @Column()
    nation: string

    @ApiProperty()
    @Column()
    language: string

    @ApiHideProperty()
    @Column({nullable: true})
    createAt: Date;

    @ApiHideProperty()
    @Column({nullable: true})
    updatedAt: Date;

    @ApiHideProperty()
    @OneToMany(type => Agent, (agent) => agent.tenant)
    Agent: Agent[]

    @ApiHideProperty()
    @OneToMany(type => Project, (project) => project.tenant)
    project: Project[]
    
}