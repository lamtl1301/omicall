import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Project } from '../project/entities/project.entity';
import { CustomerNumber } from '../phone-number/entities/customer-number.entity';
import { PhoneNumber } from '../phone-number/entities/phone-number.entity';
import { PhoneNumberModule } from '../phone-number/phone-number.module';
import { PhoneNumberService } from '../phone-number/phone-number.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Project, CustomerNumber, PhoneNumber]),
    PhoneNumberModule
  ],
  controllers: [CustomerController],
  providers: [CustomerService, PhoneNumberService],
  exports: [CustomerService]
})
export class CustomerModule {}
