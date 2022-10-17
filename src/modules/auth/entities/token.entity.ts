import { Agent } from 'src/modules/agent/entities/agent.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

export enum TokenType {
    REFRESH_TOKEN = 'refresh_token',
    VERIFY_EMAIL = 'verify_email',
}

@Entity()
export class Token {
    @PrimaryColumn()
    id: string;

    @Column({
        type: "enum",
        enum: TokenType
    })
    type: TokenType;

    @Column({name: "expires_in"})
    expiresIn: Date

    @Column({name: "agent_id"})
    agentID: number

    @ManyToOne(type => Agent, (agent) => agent.token)
    @JoinColumn({name: "agent_id"})
    agent: Agent
}



