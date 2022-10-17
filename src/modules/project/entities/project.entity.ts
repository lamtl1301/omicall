import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/common/base.entity";
import { Customer } from "src/modules/customer/entities/customer.entity";
import { Tenant } from "src/modules/tenant/entities/tenant.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Project extends BaseEntity{
    @ApiProperty()
    @Column({name: "project_name"})
    projectName: string

    @ApiProperty()
    @Column()
    domain: string

    @ApiProperty()
    @Column()
    description: string

    @ApiProperty()
    @Column({default: false, name:"is_deleted"})
    isDeleted: boolean

    @ApiProperty()
    @Column({default: true, name: "is_enabled"})
    isEnabled: boolean

    @ApiProperty()
    @Column({name: "tenant_id"})
    tenantID: string

    @ApiHideProperty()
    @ManyToOne(type => Tenant, (tenant) => tenant.project)
    @JoinColumn({name: 'tenant_id'})
    tenant: Tenant

    @ApiHideProperty()
    @OneToMany(type => Customer, (customer) => customer.project)
    customer: Customer[]

}
