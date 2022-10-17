import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@ApiTags('Customer')
@ApiBearerAuth()
@Controller(':projectID/customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post()
  create(@Query() projectID: number,
    @Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto, projectID);
  }

  @Get()
  getListCustomer(
    @Query() projectID: number,
    @Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<Customer>> {
    return this.customerService.getListCustomer(projectID, pageOptionsDto);
  }

  @Get(':id')
  findOne(
    @Query() projectID: number,
    @Param('id') id: number) {
    return this.customerService.getById(id, projectID);
  }

  @Patch(':id')
  update(
    @Query() projectID: number,
    @Param('id') id: number, 
    @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(id, projectID, updateCustomerDto);
  }

  @Delete(':id')
  remove(
    @Query() projectID: number,
    @Param('id') id: number) {
    return this.customerService.remove(id, projectID);
  }
}
