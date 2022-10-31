import { forwardRef, Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { ProjectAttribute } from './entities/project-attribute.entity';
import { AgentAttribute } from './entities/agent-attribute.entity';
import { AgentModule } from '../agent/agent.module';

@Module({
  imports:[TypeOrmModule.forFeature([Attribute, ProjectAttribute, AgentAttribute]),
  forwardRef(() => AgentModule) ,
],
  controllers: [AttributeController],
  providers: [AttributeService],
  exports: [AttributeService]
})
export class AttributeModule {}
