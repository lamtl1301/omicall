import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class CreateAgentDto {

    @IsString()
    @ApiProperty()
    readonly password: string

    @IsString()
    @ApiProperty()
    readonly email: string


    
}
