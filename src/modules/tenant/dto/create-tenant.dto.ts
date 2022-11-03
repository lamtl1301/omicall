import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsString } from "class-validator"


export class CreateTenantDto {

    @IsString()
    @ApiProperty()
    id: string

    @IsString()
    @ApiProperty()
    full_name: string

    @IsString()
    @ApiProperty()
    description: string

    @IsString()
    @ApiProperty()
    nation: string

    @IsString()
    @ApiProperty()
    language: string

}
