import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { CreateAgentDto } from './create-agent.dto';

export class UpdateAgentDto {
    @IsString()
    @ApiProperty()
    readonly password: string

    @IsString()
    @ApiProperty()
    readonly email: string

    @IsString()
    @ApiProperty()
    readonly fullName: string

    @IsString()
    @ApiProperty()
    readonly gender: string

    @ApiProperty()
    @IsString()
    readonly isDeleted: boolean

    @ApiProperty()
    @IsBoolean()
    readonly isFirstLogin: boolean

    @ApiProperty()
    @IsBoolean()
    readonly isActived: boolean

    @ApiProperty()
    @IsNumber()
    readonly tagID: number

    @ApiProperty()
    @IsNumber()
    readonly roleID: number
}
