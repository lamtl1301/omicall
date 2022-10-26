import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageMetaDto } from 'src/common/page-meta.dto';
import { PageDto } from 'src/common/pagination.dto';

import { Repository } from 'typeorm';
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
    private readonly roleRepository: Repository<Role>
  ) { }

  //admin
  async create(createTenantDto: CreateTenantDto) {
    try {
      const tenant = this.tenantRepository.create(createTenantDto)
      return this.tenantRepository.save(tenant)
    } catch (error) {
      throw error
    }
  }

  async getListTenant(pageOptionsDto: PageOptionsDto): Promise<PageDto<Tenant>>{
    const queryBuilder = this.tenantRepository.createQueryBuilder("tenant");
    queryBuilder
      .orderBy("tenant.createAt", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
    const itemCount = await queryBuilder.getCount()
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto});
    return new PageDto(entities, pageMetaDto)
    
  }

  async findById(id: string) {
    try {
      return this.tenantRepository.findOneByOrFail({ id });
    } catch (error) {
      throw error
    }

  }

  async update(id: string, updateTenantDto: UpdateTenantDto) {
    try {
      const tenant = await this.tenantRepository.findOneByOrFail({ id });
      tenant.full_name = updateTenantDto.full_name;
      tenant.description = updateTenantDto.description;
      tenant.nation = updateTenantDto.nation

    } catch (error) {
      throw error
    }

  }

  async remove(id: string) {
    try {
      const tenant = await this.tenantRepository.findOneByOrFail({id})
      tenant.is_deleted = true;
      tenant.is_enabled = false;
    } catch (error) {
      throw error
    }
  }
}
