import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/common/base.entity";
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
    @Column({nullable: true})
    full_name: string

    @ApiProperty()
    @Column({default: false})
    is_deleted: boolean

    @ApiProperty()
    @Column({default: true})
    is_first_login: boolean

    @ApiProperty()
    @Column({default: false})
    is_actived: boolean

    @ApiProperty()
    @Column({nullable: true})
    gender: string

    @ApiProperty()
    @Column({nullable: true})
    avatar: string

    @ApiProperty()
    @Column({nullable: true})
    tag_id: number

    @ApiProperty()
    @Column({nullable: true})
    role_id: number

    @ApiProperty()
    @Column({nullable: true})
    tenant_id: string

    @ApiHideProperty()
    @ManyToOne(type => Role, (role) => role.agent)
    @JoinColumn({name: "role_id"})
    role: Role
    // @OneToMany(type => Tag, (tag) => tag.agent)
    // @JoinColumn({name: "tag_id"})
    // tag: Tag[]

}