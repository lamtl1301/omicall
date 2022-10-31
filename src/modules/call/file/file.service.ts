import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { EnviromentVariables } from 'src/interface/env.interface';


@Injectable()
export class FileService {
    private s3: S3;

    constructor(
        private configService: ConfigService<EnviromentVariables>
    ){
        this.s3 = new S3({
            credentials:{
                accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
                secretAccessKey: this.configService.get('AWS_SECRET_KEY')
            }
        })
    }
    async uploadToS3(fileName: string, body: S3.Body) {
        const param: S3.PutObjectRequest = {
            Bucket: this.configService.get('S3_BUCKET'),
            Key: fileName,
            Body: body,
            ACL: 'public-read'
        };
        const { Location } = await this.s3.upload(param).promise();
        return Location
    }
}
