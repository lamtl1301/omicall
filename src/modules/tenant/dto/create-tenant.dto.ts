import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsString } from "class-validator"


export class CreateTenantDto {

    @IsString()
    @ApiProperty()
    full_name: string

    @IsString()
    @ApiProperty()
    description: string
    


    @IsBoolean()
    @ApiProperty()
    nation: string

    @IsString()
    @ApiProperty()
    language: string


}
