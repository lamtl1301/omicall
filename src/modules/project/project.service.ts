import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageMetaDto } from 'src/common/page-meta.dto';
import { PageDto } from 'src/common/pagination.dto';
import { Repository } from 'typeorm';
import { Agent } from '../agent/entities/agent.entity';
import { Attribute } from '../attribute/entities/attribute.entity';
import { ProjectAttribute } from '../attribute/entities/project-attribute.entity';
import { RoleService } from '../role/role.service';
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
    private readonly roleService: RoleService
  ) { }

  async create(createProjectDto: CreateProjectDto, agent: Agent) {
    try {
      if (agent.isOwner){
        const newProject = this.projectRepository.create(createProjectDto)
        
      } else {
        throw new ForbiddenException('Access denied')
      }

    } catch (error) {
      throw error
    }

  }

  async getListProject(pageOptionsDto: PageOptionsDto): Promise<PageDto<Project>> {
    const queryBuilder = this.projectRepository.createQueryBuilder("project");
    queryBuilder
      .orderBy("project.createAt", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
    const itemCount = await queryBuilder.getCount()
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto)
  }

  async getListProjectOfAgent(agent: Agent) {
    const listProject = this.projectRepository.find({
      where: {
        tenantID: agent.tenantID,

      }
    })
    return listProject;
  }

  async getById(projectID: number, tenantID: string) {
    try {
      return this.projectRepository.findOneOrFail({
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
            id: attributeElement.id, //id = timestamp 
            attributeName: attributeElement.key
          })
          await this.projectAttributeRepository.create({
            attributeID: newAttribute.id,
            projectID: id,
            value: attributeElement.value
          })
        } else {
          // sentAttribute.id not null => update record
          const projectAttributeRecord = await this.projectAttributeRepository.findOne({
            where: {
              id: attributeElement.id,
              projectID: id
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
      return this.projectRepository.update(id, updateProject)
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
