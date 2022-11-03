import { Module } from '@nestjs/common';
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

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, Role, Agent, Attribute, AgentAttribute, ProjectAttribute])],
  controllers: [TenantController],
  providers: [TenantService, AgentService],
  exports: [TenantService]
})
export class TenantModule {}
