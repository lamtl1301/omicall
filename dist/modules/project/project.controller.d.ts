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
    getListProject(pageOptionsDto: PageOptionsDto): Promise<PageDto<Project>>;
    findOne(id: number, tenant_id: string): Promise<Project>;
    update(tenant_id: string, id: number, updateProjectDto: UpdateProjectDto): Promise<import("typeorm").UpdateResult>;
    remove(tenant_id: string, id: number): Promise<import("typeorm").UpdateResult>;
}
