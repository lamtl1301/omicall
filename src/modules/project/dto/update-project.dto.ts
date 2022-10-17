import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"
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
    @Column({default: true})
    isEnabled: boolean


    // dynamic attribute update
}
