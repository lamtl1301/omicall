import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Agent } from '../agent/entities/agent.entity';
import { AgentRole } from './entities/agent-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Agent, AgentRole])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
