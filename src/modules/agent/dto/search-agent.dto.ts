import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class SearchAgentDto {

    @IsString()
    @ApiProperty()
    readonly email: string

    @IsString()
    @ApiProperty()
    readonly full_name: string
    
}
