import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { ProjectAttribute } from './project-attribute.entity';

@Entity()
export class Attribute {
    @PrimaryColumn()
    id: number;

    @Column({name: "attribute_name"})
    attributeName: string;

    @OneToMany(type => ProjectAttribute, (projectAttribute) => projectAttribute.attribute)
    projectAttribute: ProjectAttribute[]
}
