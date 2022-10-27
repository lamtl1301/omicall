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
    @Column({name: "full_name"})
    fullName: string

    @ApiProperty()
    @Column()
    description: string
    
    @ApiProperty()
    @Column({default: true, name:"is_enabled"})
    isEnabled: boolean

    @ApiProperty()
    @Column({default: false, name: "is_deleted"})
    isDeleted: boolean

    @ApiProperty()
    @Column({default: false, name:"is_Vihat"})
    isVihat: boolean

    @ApiProperty()
    @Column()
    nation: string

    @ApiProperty()
    @Column()
    language: string

    @ApiHideProperty()
    @Column({nullable: true, name:"create_at"})
    createAt: Date;

    @ApiHideProperty()
    @Column({nullable: true, name: "update_at"})
    updatedAt: Date;

    @ApiHideProperty()
    @OneToMany(type => Agent, (agent) => agent.tenant)
    Agent: Agent[]

    @ApiHideProperty()
    @OneToMany(type => Project, (project) => project.tenant)
    project: Project[]
    
}