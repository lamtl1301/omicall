import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { EnviromentVariables } from 'src/interface/env.interface';
export declare class FileService {
    private configService;
    private s3;
    constructor(configService: ConfigService<EnviromentVariables>);
    uploadToS3(fileName: string, body: S3.Body): Promise<string>;
}
