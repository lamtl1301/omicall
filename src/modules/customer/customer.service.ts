import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageMetaDto } from 'src/common/page-meta.dto';
import { PageDto } from 'src/common/pagination.dto';
import { Repository } from 'typeorm';
import { PhoneNumberService } from '../phone-number/phone-number.service';
import { ProjectService } from '../project/project.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly phoneNumberService : PhoneNumberService,
    //private readonly projectService: ProjectService,
  ) {}

  async create(createCustomerDto: CreateCustomerDto, projectID: number) {
    try {
      const createAt = new Date()
      createCustomerDto.phoneNumber.forEach(async phoneElement => {
        const phoneNumber = await this.phoneNumberService.getPhoneInforByNumber(phoneElement);
      if (phoneNumber) {
        // if phoneNumber in db -> check customerNumber table and check customer table
        const cusNumber = await this.phoneNumberService.getCustomerPhoneInforByPhoneID(phoneNumber.id);
        const customer = await this.customerRepository.findOne({
          where: {
            id: cusNumber.customerID,
            projectID: projectID
          }
        })
        if (customer){ 
          // customer in project is existed 
          if (cusNumber && cusNumber.isDeleted) { 
            ////customerNumber has record && deleted: true-> deleted: false
            cusNumber.isDeleted = false;
            cusNumber.createAt = createAt;
            cusNumber.updatedAt = createAt;
            return this.customerRepository.save(customer);
          } else if (cusNumber && !cusNumber.isDeleted) { 
            //customerNumber has record && deleted: false -> throw exception
            throw new BadRequestException('Phone number is existed')
          } else { 
            //customerNumber has not record -> create new
            const customer = this.customerRepository.create({
              fullName: createCustomerDto.fullName,
              email: createCustomerDto.email,
              projectID: projectID,
            })
            return this.customerRepository.save(customer);
          }
        } else {
          // customer in project is not existed
          const customer = this.customerRepository.create({
            fullName: createCustomerDto.fullName,
            email: createCustomerDto.email,
            projectID: projectID,
          })
          this.phoneNumberService.createCusNumberRecord(phoneNumber.id, customer.id)
          return this.customerRepository.save(customer);
        }
      } else {
         // if phoneNumber not in db -> create new full
         const customer = this.customerRepository.create({
          fullName: createCustomerDto.fullName,
          email: createCustomerDto.email,
          projectID: projectID,
        })
        const newPhoneNumber = await this.phoneNumberService.createPhoneNumberRecord(phoneElement);
        await this.phoneNumberService.createCusNumberRecord(customer.id, newPhoneNumber.id);
        return this.customerRepository.save(customer)
      }
      });
      
    } catch (error) {
      throw error
    }
  }

  //search by filter: not working
  async getListCustomer( //filter will here
    projectID: number,
    pageOptionsDto: PageOptionsDto): Promise<PageDto<Customer>> {
    const queryBuilder = this.customerRepository.createQueryBuilder("customer");
    queryBuilder
      .where("customer.projectID = :projectID", {projectID})
      .orderBy("customer.createAt", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      
    const itemCount = await queryBuilder.getCount()
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto});
    return new PageDto(entities, pageMetaDto)
  }


  async getById(id: number, project_id: number) {
    try {
      return this.customerRepository.findOneOrFail({
        where: {
          id: id,
          projectID: project_id
        }
      })
    } catch (error) {
      throw error
    }
  }

  async update(id: number, project_id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.getById(id, project_id)
    
    try {
      customer.email = updateCustomerDto.email;
      customer.fullName = updateCustomerDto.fullName
      updateCustomerDto.phoneNumber.forEach(phoneElement => {
        //const phoneNumber = await this.phoneNumberService.getPhoneInforByNumber(phoneElement);
        //phoneNumber
      });
      
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number, project_id: number) {
    const customer = await this.getById(id, project_id);
    try {
      const customerNumber = await this.phoneNumberService.getCustomerPhoneByCustomerID(id)
      customer.isDeleted = true;
      customer.updatedAt = new Date()
      customerNumber.forEach(element => {
        element.updatedAt = new Date()
        element.isDeleted = true;
      }); 
      
    } catch (error) {
      throw error
    }
  }
}
