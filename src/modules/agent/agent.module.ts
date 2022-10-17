import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from './entities/agent.entity';
import { Role } from './entities/role.entity';
import { Token } from '../auth/entities/token.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Agent, Role, Token])],
  controllers: [AgentController],
  providers: [AgentService],
  exports: [AgentService]
})
export class AgentModule {}
