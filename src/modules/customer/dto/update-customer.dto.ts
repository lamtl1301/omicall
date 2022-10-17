import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto {
    @ApiProperty()
    @IsString()
    fullName: string;

    @ApiProperty()
    @IsNumber()
    email: string;

    @ApiProperty()
    @IsNumber()
    phoneNumber: string[]
}
