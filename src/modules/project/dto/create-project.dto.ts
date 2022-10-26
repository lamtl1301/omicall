import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsString } from "class-validator"
import { Attribute } from "src/common/attribute.type"

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

    @ApiProperty()
    @IsArray()
    attribute: Attribute[]
}
