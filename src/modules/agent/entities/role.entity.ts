import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/base.entity';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Agent } from './agent.entity';

@Entity('Role')
export class Role extends BaseEntity{
    
    @ApiProperty()
    @Column() 
    name: string;

    @ApiProperty()
    @Column({default: false})
    isDeleted: boolean;

    @ApiProperty()
    @Column({})
    status: boolean;

    @ApiProperty()
    @Column({})
    tenant_id: string

    @ApiProperty()
    @OneToMany(type => Agent, (agent) => agent.role)
    agent: Agent[]
    
    @ApiHideProperty()
    @ManyToOne(type => Tenant, (tenant) => tenant.role)
    @JoinColumn({name: "tenant_id"})
    tenant: Tenant
}
