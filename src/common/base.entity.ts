import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Agent') 
export abstract class BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn('increment')
    id: number

    @ApiHideProperty()
    @Column({nullable: true})
    createAt: Date;

    @ApiHideProperty()
    @Column({nullable: true})
    updatedAt: Date;
}