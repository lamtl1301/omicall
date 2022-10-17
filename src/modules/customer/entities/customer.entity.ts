import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/common/base.entity";
import { CustomerNumber } from "src/modules/phone-number/entities/customer-number.entity";
import { Project } from "src/modules/project/entities/project.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Customer extends BaseEntity{
    @ApiProperty()
    @Column({name:"full_name"})
    fullName: string;

    @ApiProperty()
    @Column({name: "project_id"})
    projectID: number;

    @ApiProperty()
    @Column({nullable: true, name:"email"})
    email: string;

    @ApiProperty()
    @Column({default: false, name:"is_deleted"})
    isDeleted: boolean;

    @ApiHideProperty()
    @ManyToOne(type => Project, (project) => project.customer)
    @JoinColumn({name: "project_id"})
    project: Project

    @ApiHideProperty()
    @OneToMany(type => CustomerNumber, (customerNumber) => customerNumber.customer)

    customerNumber : CustomerNumber[]


    // @ApiProperty()
    // @Column()
    // service_name: string;
}
