import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsBoolean, IsString } from "class-validator"
import { Attribute } from "src/common/attribute.type"

import { Column } from "typeorm"


export class UpdateProjectDto{
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
    @IsBoolean()
    isEnabled: boolean

    @ApiProperty()
    @IsArray()
    attribute: Attribute[]

    // dynamic attribute update
}
