import { Module } from '@nestjs/common';
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

@Module({
  imports: [TypeOrmModule.forFeature([Project, Customer, Tenant, Agent, ProjectAttribute, Attribute])
    ,RoleModule,
    
  ],
  controllers: [ProjectController],
  providers: [ProjectService, AgentService],
  exports: [ProjectService]
})
export class ProjectModule {}
