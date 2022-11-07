import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageMetaDto } from 'src/common/page-meta.dto';
import { PageDto } from 'src/common/pagination.dto';
import { Repository } from 'typeorm';
import { AgentService } from '../agent/agent.service';
import { Agent } from '../agent/entities/agent.entity';
import { Attribute } from '../attribute/entities/attribute.entity';
import { ProjectAttribute } from '../attribute/entities/project-attribute.entity';
import { RoleService } from '../role/role.service';
import { TenantService } from '../tenant/tenant.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectAttribute)
    private readonly projectAttributeRepository: Repository<ProjectAttribute>,
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
    @Inject(forwardRef(() => AgentService))
    private readonly agentService: AgentService,
    @Inject(forwardRef(() => TenantService))
    private readonly tenantService: TenantService,
    private readonly roleService: RoleService
  ) { }

  async create(createProjectDto: CreateProjectDto, agentID: number, tenantID: string) {
    try {
      const agent = await this.agentService.getById(agentID);
      if (agent.isOwner) {
        const newProject = this.projectRepository.create({
          projectName: createProjectDto.projectName,
          pbx_domain: createProjectDto.pbx_domain,
          description: createProjectDto.description,
          tenantID: tenantID
        })
        this.projectRepository.save(newProject)
        const listAttribute = createProjectDto.attribute;
        if (listAttribute.length > 0){
          listAttribute.forEach(async attributeElement => {
            const newAttribute = await this.attributeRepository.create({
              attributeName: attributeElement.key
            })
            this.attributeRepository.save(newAttribute)
            console.log("aat",newAttribute)
            const newProjectAtt = this.projectAttributeRepository.create({
              attributeID: newAttribute.id,
              projectID: newProject.id,
              value: attributeElement.value
            })
            this.projectAttributeRepository.save(newProjectAtt)
          })
        }
        const time = new Date()
        newProject.updatedAt = time;
        newProject.createAt = time;
        return this.projectRepository.save(newProject);
      } else {
        throw new ForbiddenException('Access denied')
      }

    } catch (error) {
      throw error
    }

  }

  async getListProject(tenantID: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<Project>> {
    const tenant = await this.tenantService.findById(tenantID);
    const queryBuilder = this.projectRepository.createQueryBuilder("project");
    if (tenant && tenant.isVihat == true) {
      queryBuilder
        .orderBy("project.createAt", pageOptionsDto.order)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take)
        .getMany()
    } else {
      queryBuilder
        // .where("project.tenant_id like :id", {id: `%${tenantID}%`})
        .where("project.tenant_id = :q", { q: tenantID })
        .orderBy("project.createAt", pageOptionsDto.order)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take)
        .getMany()
    }
    const itemCount = await queryBuilder.getCount()
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto)
  }

  async getListProjectOfTenant(tenantID: string) {
    const listProject = this.projectRepository.find({
      where: {
        tenantID: tenantID,

      }
    })
    return listProject;
  }

  async getById(projectID: number, tenantID: string) {
    try {
      return this.projectRepository.findOne({
        where: {
          tenantID: tenantID,
          id: projectID,
        }
      })
    } catch (error) {
      throw error
    }
  }

  async update(tenantID: string, id: number, updateProjectDto: UpdateProjectDto) {
    const updateProject = await this.getById(id, tenantID);
    try {
      updateProject.projectName = updateProjectDto.projectName;
      updateProject.isEnabled = updateProjectDto.isEnabled;
      // dynamic attribute update
      updateProjectDto.attribute.forEach(async attributeElement => {
        if (attributeElement === null || typeof (attributeElement) == null) {
          //sentAttribute.id is null => create new
          const newAttribute = await this.attributeRepository.create({
            attributeName: attributeElement.key
          })
          this.attributeRepository.save(newAttribute)
          const newProjectAtt = await this.projectAttributeRepository.create({
            attributeID: newAttribute.id,
            projectID: id,
            value: attributeElement.value
          })
          this.projectAttributeRepository.save(newProjectAtt)
        } else {
          // sentAttribute.id not null => update record
          const projectAttributeRecord = await this.projectAttributeRepository.findOne({
            where: {
              id: attributeElement.id,
              projectID: id,
            }
          })
          projectAttributeRecord.value = attributeElement.value
          const attributeRecord = await this.attributeRepository.findOne({
            where: {
              id: projectAttributeRecord.attributeID
            }
          })
          attributeRecord.attributeName = attributeElement.key
          this.attributeRepository.save(attributeRecord)
          this.projectAttributeRepository.save(projectAttributeRecord)
        }
      })
      updateProject.updatedAt = new Date()
      return this.projectRepository.save(updateProject)
    } catch (error) {
      throw error
    }
  }

  async remove(id: number, tenant_id: string) {
    const project = await this.getById(id, tenant_id)
    try {
      project.isDeleted = true;
      project.isEnabled = false;
      project.updatedAt = new Date();
      return this.projectRepository.update(id, project)
    } catch (error) {
      throw error
    }

  }

}
