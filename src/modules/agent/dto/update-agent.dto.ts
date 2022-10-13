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
    readonly full_name: string

    @IsString()
    @ApiProperty()
    readonly gender: string

    @ApiProperty()
    @IsString()
    readonly is_deleted: boolean

    @ApiProperty()
    @IsBoolean()
    readonly is_first_login: boolean

    @ApiProperty()
    @IsBoolean()
    readonly is_actived: boolean

    @ApiProperty()
    @IsNumber()
    readonly tag_id: number

    @ApiProperty()
    @IsNumber()
    readonly role_id: number
}
