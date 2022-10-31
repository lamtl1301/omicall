import { forwardRef, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Tenant } from '../tenant/entities/tenant.entity';
import { Agent } from '../agent/entities/agent.entity';
import { ProjectAttribute } from '../attribute/entities/project-attribute.entity';
import { Attribute } from '../attribute/entities/attribute.entity';
import { RoleService } from '../role/role.service';
import { RoleModule } from '../role/role.module';
import { AgentService } from '../agent/agent.service';
import { AgentModule } from '../agent/agent.module';
import { AttributeModule } from '../attribute/attribute.module';
import { Role } from '../role/entities/role.entity';
import { AgentAttribute } from '../attribute/entities/agent-attribute.entity';
import { AgentRole } from '../role/entities/agent-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Customer, Tenant, Agent, ProjectAttribute, Attribute, Role, AgentAttribute, AgentRole]),
    forwardRef(() => RoleModule) ,
    forwardRef(() => AgentModule) ,
    forwardRef(() => AttributeModule) ,
  ],
  controllers: [ProjectController],
  providers: [ProjectService, AgentService, RoleService],
  exports: [ProjectService]
})
export class ProjectModule {}
