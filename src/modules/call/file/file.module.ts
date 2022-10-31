import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileService } from './file.service';

@Module({
    imports: [ConfigModule],
    providers: [FileService, ConfigService],
    exports: [FileService]
})
    
export class FileModule {}
