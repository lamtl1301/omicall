import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermission } from 'src/utils/role-permission.enum';
import { Repository } from 'typeorm';
import { Agent } from '../agent/entities/agent.entity';
import { Role } from './entities/role.entity';
import { Project } from '../project/entities/project.entity';
import { AgentRole } from './entities/agent-role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        @InjectRepository(AgentRole)
        private readonly agentRoleRepository: Repository<AgentRole>,
        @InjectRepository(Agent)
        private readonly agentRepository: Repository<Agent>
    ) {}
    
    async createRoleTenantWhenCreatedNewProject(project: Project, agentID: number){
        try {
            const tenantRoleforNewCreatedProject = this.roleRepository.create({
                projectID: project.id,
                permission: RolePermission.TENANT,
                isOwner: true,
                name: "Owner",
            })
            await this.agentRoleRepository.create({
                roleID: tenantRoleforNewCreatedProject.id,
                agentID: agentID
            })
        } catch (error) {
            throw error
        }
    } // 

    async isHasPermissions(agent: Agent, rolePermission: RolePermission): Promise<boolean>{
        const role = await this.agentRoleRepository.findOne({
            where: {

                
            }
        })

        return false;
    }

}
