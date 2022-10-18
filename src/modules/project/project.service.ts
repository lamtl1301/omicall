import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageMetaDto } from 'src/common/page-meta.dto';
import { PageDto } from 'src/common/pagination.dto';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ){}

  async create(createProjectDto: CreateProjectDto) {
    try {
      
    } catch (error) {
      throw error
    }

  }

  async getListProject( pageOptionsDto: PageOptionsDto): Promise<PageDto<Project>> {
    const queryBuilder = this.projectRepository.createQueryBuilder("project");
    queryBuilder
      .orderBy("project.createAt", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
    const itemCount = await queryBuilder.getCount()
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto});
    return new PageDto(entities, pageMetaDto)
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
    const updateProject= await this.getById(id, tenantID);
    try {
      updateProject.projectName = updateProjectDto.projectName;
      updateProject.isEnabled = updateProjectDto.isEnabled;
      // dynamic attribute update
      updateProject.updatedAt = new Date()
      return this.projectRepository.update(id, updateProject)
    } catch (error) {
      throw error
    }
  }

  async remove(id: number, tenant_id: string) {
    const project= await this.getById(id, tenant_id)
    try {
      project.isDeleted = true;
      project.isEnabled = false;
      project.updatedAt = new Date();
      return this.projectRepository.update(id, project)
    } catch (error) {
      throw error
    }
    
  }
  async gitsample(id: number){
    
  }
}
