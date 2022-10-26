import { Module } from '@nestjs/common';
import { CallService } from './call.service';
import { CallController } from './call.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryCall } from './entities/call.entity';
import { FileRecord } from './entities/file.entity';
import { FileType } from './entities/file-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryCall,FileRecord, FileType])],
  controllers: [CallController],
  providers: [CallService]
})
export class CallModule {}
