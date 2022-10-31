import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';
import { Repository } from 'typeorm';
import { PhoneNumberService } from '../phone-number/phone-number.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
export declare class CustomerService {
    private readonly customerRepository;
    private readonly phoneNumberService;
    constructor(customerRepository: Repository<Customer>, phoneNumberService: PhoneNumberService);
    create(createCustomerDto: CreateCustomerDto, projectID: number): Promise<void>;
    getListCustomer(projectID: number, pageOptionsDto: PageOptionsDto): Promise<PageDto<Customer>>;
    getById(id: number, project_id: number): Promise<Customer>;
    update(id: number, project_id: number, updateCustomerDto: UpdateCustomerDto): Promise<void>;
    remove(id: number, project_id: number): Promise<void>;
}
