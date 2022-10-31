import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create(projectID: number, createCustomerDto: CreateCustomerDto): Promise<void>;
    getListCustomer(projectID: number, pageOptionsDto: PageOptionsDto): Promise<PageDto<Customer>>;
    findOne(projectID: number, id: number): Promise<Customer>;
    update(projectID: number, id: number, updateCustomerDto: UpdateCustomerDto): Promise<void>;
    remove(projectID: number, id: number): Promise<void>;
}
