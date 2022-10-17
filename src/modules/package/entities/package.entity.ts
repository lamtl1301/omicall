import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/common/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Package extends BaseEntity{
    @ApiProperty()
    @Column({name: "service_name"})
    service_name: string;

    @ApiProperty()
    @Column({nullable: true, name: "description"})
    description: string;

    @ApiProperty()
    @Column({nullable: true, type: "float", name: "price"})
    price: number

    @ApiProperty()
    @Column({nullable: true, name: "customer_num"})
    customerNum: number

    @ApiProperty()
    @Column({nullable: true, name: "staff_num"})
    staffNum: number

    @ApiProperty()
    @Column({nullable: true, name: "package_expire"})
    packageExpire: number

    @ApiProperty()
    @Column({nullable: true, name: "expire_unit"})
    expireUnit: string

    @ApiProperty()
    @Column({default: false, name: "is_deleted"})
    isDeleted: boolean

    @ApiProperty()
    @Column({default: true, name: "is_enabled"})
    isEnabled: boolean

}
