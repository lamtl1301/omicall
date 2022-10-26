import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attribute } from './entities/attribute.entity';

@Injectable()
export class AttributeService {
    constructor(
        @InjectRepository(Attribute)
        private readonly attributeRepository : Repository<Attribute>
    ) {}
    

}
