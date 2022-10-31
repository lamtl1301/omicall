import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsNumber()
    agentID: number;

    @ApiProperty()
    @IsNumber()
    projectID: number
}
