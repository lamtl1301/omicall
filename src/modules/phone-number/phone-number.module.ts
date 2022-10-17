import { Module } from '@nestjs/common';
import { PhoneNumberService } from './phone-number.service';
import { PhoneNumberController } from './phone-number.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumber } from './entities/phone-number.entity';
import { CustomerNumber } from './entities/customer-number.entity';
import { Customer } from '../customer/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneNumber, CustomerNumber])],
  controllers: [PhoneNumberController],
  providers: [PhoneNumberService],
  exports: [PhoneNumberService]
})
export class PhoneNumberModule {}
