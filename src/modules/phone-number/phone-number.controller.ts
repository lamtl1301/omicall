import { Controller } from '@nestjs/common';
import { PhoneNumberService } from './phone-number.service';

@Controller('phone-number')
export class PhoneNumberController {
  constructor(private readonly phoneNumberService: PhoneNumberService) {}
}
