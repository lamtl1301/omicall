import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCustomerDto {
    @ApiProperty()
    @IsString()
    fullName: string;

    @ApiProperty()
    @IsNumber()
    email: string;

    @ApiProperty()
    @IsNumber()
    phoneNumber: string[]
}
