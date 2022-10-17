import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/common/base.entity";
import { Token } from "src/modules/auth/entities/token.entity";
import { Tenant } from "src/modules/tenant/entities/tenant.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Role } from "./role.entity";
//import { Tag } from "./tag.entities";
// import { Tenant } from "./tenant.entities";

@Entity('Agent') 
export class Agent extends BaseEntity {

    @ApiProperty()
    @Column({nullable: true})
    password: string

    @ApiProperty()
    @Column({nullable: true})
    email: string

    @ApiProperty()
    @Column({nullable: true, name:"full_name"})
    fullName: string

    @ApiProperty()
    @Column({default: false, name:"is_deleted"})
    isDeleted: boolean

    @ApiProperty()
    @Column({default: true, name:"is_first_login"})
    isFirstLogin: boolean

    @ApiProperty()
    @Column({default: false, name:"is_actived"})
    isActived: boolean

    @ApiProperty()
    @Column({nullable: true})
    gender: string

    @ApiProperty()
    @Column({nullable: true})
    avatar: string

    @ApiProperty()
    @Column({nullable: true, name:"tag_id"})
    tagID: number

    @ApiProperty()
    @Column({nullable: true, name:"role_id"})
    roleID: number

    @ApiProperty()
    @Column({nullable: true, name:"tenant_id"})
    tenantID: string

    @ApiHideProperty()
    @ManyToOne(type => Role, (role) => role.agent)
    @JoinColumn({name: "role_id"})
    role: Role

    @ApiHideProperty()
    @OneToMany(type => Token, (token) => token.agent)
    token: Token[]

    @ApiHideProperty()
    @ManyToOne(type => Tenant, (tenant) => tenant.Agent)
    @JoinColumn({name: "tenant_id"})
    tenant: Tenant

    // @OneToMany(type => Tag, (tag) => tag.agent)
    // @JoinColumn({name: "tag_id"})
    // tag: Tag[]

}