import { Controller } from '@nestjs/common';
import { AttributeService } from './attribute.service';

@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}
}
