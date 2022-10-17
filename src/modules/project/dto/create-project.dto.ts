import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateProjectDto {
    @ApiProperty()
    @IsString()
    projectName: string

    @ApiProperty()
    @IsString()
    domain: string

    @ApiProperty()
    @IsString()
    description: string

}
