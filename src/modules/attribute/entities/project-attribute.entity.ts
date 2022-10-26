import { BaseAttribute } from 'src/common/base-attribute.entity';
import { Project } from 'src/modules/project/entities/project.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Attribute } from './attribute.entity';

@Entity()
export class ProjectAttribute extends BaseAttribute{

    @Column({name: "project_id"})
    projectID: number;
    
    @Column({name: "display_index"})
    displayIndex: number

    @ManyToOne(type => Attribute, (attribute) => attribute.projectAttribute)
    @JoinColumn({name: "attribute_id"})
    attribute: Attribute

    @ManyToOne(type => Project, (project) => project.projectAttribute)
    @JoinColumn({name: "project_id"})
    project: Project
}
