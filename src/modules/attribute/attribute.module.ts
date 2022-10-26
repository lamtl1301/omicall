import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { ProjectAttribute } from './entities/project-attribute.entity';
import { AgentAttribute } from './entities/agent-attribute.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Attribute, ProjectAttribute, AgentAttribute])],
  controllers: [AttributeController],
  providers: [AttributeService],
  exports: [AttributeService]
})
export class AttributeModule {}
