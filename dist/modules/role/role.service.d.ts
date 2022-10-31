import { RolePermission } from 'src/utils/role-permission.enum';
import { Repository } from 'typeorm';
import { Agent } from '../agent/entities/agent.entity';
import { Role } from './entities/role.entity';
import { Project } from '../project/entities/project.entity';
import { AgentRole } from './entities/agent-role.entity';
export declare class RoleService {
    private readonly roleRepository;
    private readonly agentRoleRepository;
    private readonly agentRepository;
    constructor(roleRepository: Repository<Role>, agentRoleRepository: Repository<AgentRole>, agentRepository: Repository<Agent>);
    createRoleTenantWhenCreatedNewProject(project: Project, agentID: number): Promise<void>;
    isHasPermissions(agent: Agent, rolePermission: RolePermission): Promise<boolean>;
}
