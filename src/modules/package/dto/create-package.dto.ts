import { ApiProperty } from "@nestjs/swagger";
import { isNumber, IsNumber, IsString } from "class-validator";

export class CreatePackageDto {
    @ApiProperty()
    @IsString()
    service_name: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNumber()
    price: number

    @ApiProperty()
    @IsNumber()
    customer_num: number

    @ApiProperty()
    @IsNumber()
    staff_num: number

    @ApiProperty()
    @IsNumber()
    package_expire: number

    @ApiProperty()
    @IsString()
    expire_unit: string


}
