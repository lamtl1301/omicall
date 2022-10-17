import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/base.entity';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PhoneNumber } from './phone-number.entity';

@Entity()
export class CustomerNumber extends BaseEntity {

    @ApiProperty()
    @Column({name: "phone_number_id"})
    phoneNumberID: number;

    @ApiProperty()
    @Column({name: "customer_id"})
    customerID: number;

    @ApiProperty()
    @Column({default: false, name: "is_deleted"})
    isDeleted: boolean;

    @ApiHideProperty()
    @ManyToOne(type => PhoneNumber, (phoneNumber) => phoneNumber.customerNumber)
    @JoinColumn({name: ""})
    phoneNumber : PhoneNumber

    @ApiHideProperty()
    @ManyToOne(type => Customer, (customer) => customer.customerNumber)
    @JoinColumn({name: "customer_id"})
    customer : Customer
}
