import { forwardRef, Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { Role } from '../role/entities/role.entity';
import { AgentService } from '../agent/agent.service';
import { Agent } from '../agent/entities/agent.entity';
import { AgentAttribute } from '../attribute/entities/agent-attribute.entity';
import { Attribute } from '../attribute/entities/attribute.entity';
import { ProjectAttribute } from '../attribute/entities/project-attribute.entity';
import { ProjectService } from '../project/project.service';
import { Project } from '../project/entities/project.entity';
import { Customer } from '../customer/entities/customer.entity';
import { CustomerNumber } from '../phone-number/entities/customer-number.entity';
import { PhoneNumber } from '../phone-number/entities/phone-number.entity';
import { ProjectModule } from '../project/project.module';
import { RoleService } from '../role/role.service';
import { AgentRole } from '../role/entities/agent-role.entity';
import { AgentModule } from '../agent/agent.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, Role, Agent, Attribute, AgentAttribute, 
    ProjectAttribute, Project, Customer, CustomerNumber, PhoneNumber, AgentRole
  ]),
  forwardRef(() => ProjectModule),

],
  
  controllers: [TenantController],
  providers: [TenantService, AgentService, ProjectService, RoleService],
  exports: [TenantService]
})
export class TenantModule {}
