import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageMetaDto } from 'src/common/page-meta.dto';
import { PageDto } from 'src/common/pagination.dto';

import { Repository } from 'typeorm';
import { AgentService } from '../agent/agent.service';
import { Role } from '../role/entities/role.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly agentService: AgentService
  ) { }

  //admin
  async create(userID: number, createTenantDto: CreateTenantDto) {
    try {
      const agent = await this.agentService.getById(userID)
      const agentTenant = await this.findById(agent.tenantID)
      if (agentTenant && agentTenant.isVihat == true) {
        const checkTenant =await  this.findById(createTenantDto.id)
        if (checkTenant ) {
          throw new BadRequestException('Tenant ID is existed')
        } else {
          const tenant = this.tenantRepository.create({
            id: createTenantDto.id,
            fullName: createTenantDto.full_name,
            description: createTenantDto.description,
            nation: createTenantDto.nation,
            language: createTenantDto.language
          });
         // const accountForTenant = this.agentService.createAgent(tenant.id, createTenantDto)
          this.tenantRepository.save(tenant)
          return { tenant }
        }
      } else {
        throw new ForbiddenException('Access denied')
      }
    } catch (error) {
      throw error
    }
  }

  //admin
  async getListTenant(pageOptionsDto: PageOptionsDto, userID: number): Promise<PageDto<Tenant>>{
    try {
      const agent = await this.agentService.getById(userID);
      const tenant = await this.findById(agent.tenantID)
      if (tenant && tenant.isVihat == true) {
        const queryBuilder = this.tenantRepository.createQueryBuilder("tenant");
        queryBuilder
          .orderBy("tenant.createAt", pageOptionsDto.order)
          .skip(pageOptionsDto.skip)
          .take(pageOptionsDto.take)
          .getMany()
        const itemCount = await queryBuilder.getCount()
        const { entities } = await queryBuilder.getRawAndEntities();
        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto});
        return new PageDto(entities, pageMetaDto)
      }
      else {
        throw new ForbiddenException('Access denied')
      }
    } catch (error) {
      throw error
    }

    
  }

  async findById(id: string) {
    try {
      return this.tenantRepository.findOneBy({ id });
    } catch (error) {
      throw error
    }

  }

  async update(id: string, updateTenantDto: UpdateTenantDto) {
    try {
      const tenant = await this.tenantRepository.findOneByOrFail({ id });
      tenant.fullName = updateTenantDto.full_name;
      tenant.description = updateTenantDto.description;
      tenant.nation = updateTenantDto.nation

    } catch (error) {
      throw error
    }

  }

  async remove(id: string) {
    try {
      const tenant = await this.tenantRepository.findOneByOrFail({id})
      tenant.isDeleted = true;
      tenant.isEnabled = false;
    } catch (error) {
      throw error
    }
  }
}
