import { BaseEntity } from 'src/common/base.entity';
import { Project } from 'src/modules/project/entities/project.entity';
import { AgentRole } from './agent-role.entity';
export declare class Role extends BaseEntity {
    name: string;
    isDeleted: boolean;
    isOwner: boolean;
    status: boolean;
    projectID: number;
    permission: number;
    roleLevel: number;
    agentRole: AgentRole[];
    project: Project;
}
