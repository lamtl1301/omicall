import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BaseAttribute {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({name: "attribute_id"})
    attributeID: number;

    @Column({name: "value"})
    value: string;
    
    @Column({name: "is_deleted"})
    isDeleted: boolean
}
