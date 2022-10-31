import { Agent } from "src/modules/agent/entities/agent.entity";
import { Project } from "src/modules/project/entities/project.entity";
export declare class Tenant {
    id: string;
    fullName: string;
    description: string;
    isEnabled: boolean;
    isDeleted: boolean;
    isVihat: boolean;
    nation: string;
    language: string;
    createAt: Date;
    updatedAt: Date;
    Agent: Agent[];
    project: Project[];
}
