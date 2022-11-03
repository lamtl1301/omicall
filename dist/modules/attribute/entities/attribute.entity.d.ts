import { AgentAttribute } from './agent-attribute.entity';
import { ProjectAttribute } from './project-attribute.entity';
export declare class Attribute {
    id: number;
    attributeName: string;
    projectAttribute: ProjectAttribute[];
    agentAttribute: AgentAttribute[];
}
