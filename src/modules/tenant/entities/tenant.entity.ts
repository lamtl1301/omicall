import { BaseEntity } from "src/common/base.entity";
import { Role } from "src/modules/agent/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity() 
export class Tenant extends BaseEntity{

    @Column()
    full_name: string

    @Column()
    description: string
    
    @Column({default: true})
    is_enabled: boolean

    @Column({default: false})
    is_deleted: boolean

    @Column()
    nation: string

    @Column()
    language: string

    @OneToMany(type => Role, (role) => role.tenant)
    role: Role[]
    
}