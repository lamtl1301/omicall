import { BaseEntity } from "src/common/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Package extends BaseEntity{
    @Column()
    service_name: string;

    @Column({nullable: true})
    description: string;

    @Column({nullable: true})
    price: string

    @Column({nullable: true})
    customer_num: number

    @Column({nullable: true})
    staff_num: number

    @Column({nullable: true})
    package_exp: number

    @Column({default: false})
    is_deleted: boolean

    @Column({default: true})
    is_enabled: boolean

}
