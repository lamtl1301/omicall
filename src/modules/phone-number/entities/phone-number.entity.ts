import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CustomerNumber } from './customer-number.entity';

@Entity()
export class PhoneNumber extends BaseEntity {

    @ApiProperty()
    @Column()
    number: string;

    @ApiProperty()
    @Column({nullable: true})
    provider: string;

    @ApiProperty()
    @Column({nullable: true, name:"provider_type"})
    providerType: string;

    @ApiProperty()
    @Column({nullable: true, name:"number_type"})
    numberType: string;

    @ApiProperty()
    @Column({nullable: true})
    nation: string;

    @ApiHideProperty()
    @OneToMany(type => CustomerNumber, (customerNumber) => customerNumber.phoneNumber)
    customerNumber: CustomerNumber[]


}
