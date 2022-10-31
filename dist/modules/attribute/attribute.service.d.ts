import { Repository } from 'typeorm';
import { Attribute } from './entities/attribute.entity';
export declare class AttributeService {
    private readonly attributeRepository;
    constructor(attributeRepository: Repository<Attribute>);
}
