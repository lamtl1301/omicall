import { BadRequestException, ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageMetaDto } from 'src/common/page-meta.dto';
import { PageDto } from 'src/common/pagination.dto';

import { Repository } from 'typeorm';
import { AgentService } from '../agent/agent.service';
import { Agent } from '../agent/entities/agent.entity';
import { Project } from '../project/entities/project.entity';
import { ProjectService } from '../project/project.service';
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
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @Inject(forwardRef(() => AgentService))
    private readonly agentService: AgentService,
    @Inject(forwardRef(() => ProjectService))
    private readonly projectService: ProjectService
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

  async update(uTenantID: string, updateTenantDto: UpdateTenantDto, userID: number) {
    try {
      const agent = await this.agentService.getById(userID);
      const tenant = await this.findById(agent.tenantID);
      if (tenant && tenant.isVihat == true || agent.isOwner == true){
        const updateTenant = await this.findById(uTenantID);
        updateTenant.fullName = updateTenantDto.full_name;
        updateTenant.description = updateTenantDto.description;
        updateTenant.nation = updateTenantDto.nation
      } else {
        throw new ForbiddenException('Access denied')
      }

    } catch (error) {
      throw error
    }

  }

  async remove(deleteTenantID: string, userID: number) {
    try {
      const agent = await this.agentService.getById(userID);
      const tenant = await this.findById(agent.tenantID);
      if (tenant && tenant.isVihat == true ) {
        const deleteTenant = await this.findById(deleteTenantID)
        deleteTenant.isDeleted = true;
        deleteTenant.isEnabled = false;
        this.tenantRepository.save(deleteTenant)
        // list agent isdeleted => true
        const listAgentOfTenant = await this.agentService.getListAgentOfTenant(deleteTenantID)
        listAgentOfTenant.forEach( async agent => {
          agent.isActived = false;
          agent.isDeleted = true;
        })
        this.agentRepository.save(listAgentOfTenant)
        // isdeleted of project => true
        const listProjectOfTenant = await this.projectService.getListProjectOfTenant(deleteTenantID)
        listProjectOfTenant.forEach(async project => {
          project.isDeleted = true;
          project.isEnabled = false;
        })
        this.projectRepository.save(listProjectOfTenant)
      } else {
        throw new ForbiddenException('Access denied')
      }

    } catch (error) {
      throw error
    }
  }
}
