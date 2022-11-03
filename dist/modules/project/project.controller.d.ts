import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';
import { Project } from './entities/project.entity';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto, agentID: number): Promise<void>;
    getListProject(tenantID: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<Project>>;
    findOne(projectID: number, tenant_id: string): Promise<Project>;
    update(tenantID: string, id: number, updateProjectDto: UpdateProjectDto): Promise<Project>;
    remove(tenantID: string, id: number): Promise<import("typeorm").UpdateResult>;
}
