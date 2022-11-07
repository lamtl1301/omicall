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
import { TenantService } from '../tenant/tenant.service';
import { CustomerNumber } from '../phone-number/entities/customer-number.entity';
import { PhoneNumber } from '../phone-number/entities/phone-number.entity';
import { TenantModule } from '../tenant/tenant.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Customer, Tenant, Agent, 
    ProjectAttribute, Attribute, Role, AgentAttribute, AgentRole, CustomerNumber, PhoneNumber]),
    forwardRef(() => AgentModule),
    forwardRef(() => RoleModule),
    forwardRef(() => AttributeModule) ,
    forwardRef(() => TenantModule)
  ],
  
  controllers: [ProjectController],
  providers: [ProjectService, AgentService, RoleService, TenantService],
  exports: [ProjectService]
})
export class ProjectModule {}
