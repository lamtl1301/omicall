import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';
import { Project } from './entities/project.entity';

@ApiTags('Project')
@ApiBearerAuth()
//@Controller('project')
@Controller(':tenantID/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  async getListProject(
    @Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<Project>> {
    return this.projectService.getListProject(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Param('tenant_id') tenant_id: string) {
    return this.projectService.getById(id, tenant_id);
  }

  @Patch(':id')
  update(
    @Param('tenant_id') tenant_id: string,
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(tenant_id, id, updateProjectDto);
  }

  @Delete(':id')
  remove(
    @Param('tenant_id') tenant_id: string,
    @Param('id') id: number) {
    return this.projectService.remove(id, tenant_id);
  }
}
