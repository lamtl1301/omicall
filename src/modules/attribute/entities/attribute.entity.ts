import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { AgentAttribute } from './agent-attribute.entity';
import { ProjectAttribute } from './project-attribute.entity';

@Entity()
export class Attribute {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({name: "attribute_name"})
    attributeName: string;

    @OneToMany(type => ProjectAttribute, (projectAttribute) => projectAttribute.attribute)
    projectAttribute: ProjectAttribute[]

    @OneToMany(type => AgentAttribute, (agentAttribute) => agentAttribute.attribute)
    agentAttribute: AgentAttribute[]
}
