import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyEmailToken {
    @ApiProperty()
    @IsString()
    token: string;
}