import { forwardRef, Inject, Module } from '@nestjs/common';
import { CallService } from './call.service';
import { CallController } from './call.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryCall } from './entities/call.entity';
import { FileRecord } from './entities/file.entity';
import { FileType } from './entities/file-type.entity';
import { AgentService } from '../agent/agent.service';
import { FileService } from './file/file.service';
import { AgentModule } from '../agent/agent.module';
import { FileModule } from './file/file.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => AgentModule),
    forwardRef(() => FileModule),
    forwardRef(() => ConfigModule),
    TypeOrmModule.forFeature([HistoryCall,FileRecord, FileType]),
    
  ],
  
  controllers: [CallController],
  providers: [CallService, FileService, ConfigService],

})
export class CallModule {}
