import { forwardRef, Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from './entities/agent.entity';
import { Role } from '../role/entities/role.entity';
import { Token } from '../auth/entities/token.entity';
import { AgentAttribute } from '../attribute/entities/agent-attribute.entity';
import { Attribute } from '../attribute/entities/attribute.entity';
import { RoleModule } from '../role/role.module';
import { ProjectModule } from '../project/project.module';
import { RoleService } from '../role/role.service';
import { AttributeModule } from '../attribute/attribute.module';
import { AgentRole } from '../role/entities/agent-role.entity';
import { ProjectService } from '../project/project.service';
import { Project } from '../project/entities/project.entity';
import { ProjectAttribute } from '../attribute/entities/project-attribute.entity';
import { Tenant } from '../tenant/entities/tenant.entity';
import { TenantModule } from '../tenant/tenant.module';
import { TenantService } from '../tenant/tenant.service';


@Module({
  imports: [TypeOrmModule.forFeature([Agent, Role, Token, AgentAttribute, Attribute, AgentRole, Project, ProjectAttribute, Tenant]),
    forwardRef(() => RoleModule),
    forwardRef(() => ProjectModule) ,
    forwardRef(() => AttributeModule) ,
    forwardRef(() => TenantModule)
],
  controllers: [AgentController],
  providers: [AgentService, RoleService, ProjectService, TenantService],
  exports: [AgentService]
})
export class AgentModule {}
