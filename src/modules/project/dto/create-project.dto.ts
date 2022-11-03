import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNumber, IsString } from "class-validator"
import { Attribute } from "src/common/attribute.type"

export class CreateProjectDto {
    @ApiProperty()
    @IsNumber()
    tenantID: string 

    @ApiProperty()
    @IsString()
    projectName: string

    @ApiProperty()
    @IsString()
    pbx_domain: string

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsArray()
    attribute: Attribute[]
}
