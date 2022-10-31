import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCallDto {

    @ApiProperty()
    @IsNumber()
    readonly agentID: number
    //sessionID: 

    @ApiProperty()
    @IsNumber()
    readonly projectNumberID: number

    @ApiProperty()
    @IsNumber()
    readonly customerNumberID: number

    @ApiProperty()
    @IsNumber()
    readonly timeStartToAnswer: number

    @ApiProperty()
    @IsNumber()
    readonly duration: number

    @ApiProperty()
    @IsString()
    readonly disposition: string

    @ApiProperty()
    @IsString()
    readonly fileTypeName: string
    
    @ApiProperty()
    @IsNumber()
    readonly file: number
}
