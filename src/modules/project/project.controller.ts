import { Controller, Get, Post, Body, Patch, Delete, Query, Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';
import { Project } from './entities/project.entity';
import { Agent } from '../agent/entities/agent.entity';
import { User } from 'src/decorator/user.decorator';

@ApiTags('Project')
@ApiBearerAuth()
//@Controller('project')
@Controller(':tenantID/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Query() agentID: number) {
    return this.projectService.create(createProjectDto, agentID);
  }

  @Get()
  async getListProject(
    @User('tenantID') tenantID: string ,
    @Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<Project>> {
      console.log("tenantID", tenantID)
      return this.projectService.getListProject(tenantID, pageOptionsDto);
  }

  @Get(':id')
    findOne(@Param() projectID: number, 
          @User('tenant_id') tenant_id: string) {
    return this.projectService.getById(projectID, tenant_id);
  }

  @Patch(':id')
  update(
    @User('tenant_id') tenantID: string,
    @User('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(tenantID, id, updateProjectDto);
  }

  @Delete(':id')
  remove(
    @User('tenant_id') tenantID: string,
    @User('id') id: number) {
    return this.projectService.remove(id, tenantID);
  }
}
