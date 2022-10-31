import { BaseEntity } from 'src/common/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm';
import { FileRecord } from './file.entity';

@Entity()
export class HistoryCall extends BaseEntity {
    // @PrimaryColumn()
    // id: number;

    // @Column({name: "session_id"})
    // sessionID: string;

    @Column({name: "agent_id"})
    agentID: number

    @Column({name: "file_id"})
    fileID: number
    
    @Column({name: "project_number_id"})
    projectNumberID: number
    
    @Column({name: "customer_number_id"})
    customerNumberID: number
    
    @Column({name: "time_start_to_answer"})
    timeStartToAnswer: number
    
    @Column({name: "duration"})
    duration: number

    @Column({name: "disposition"})
    disposition: string

    @OneToMany((type) => FileRecord, (file) => file.historyCall)
    @JoinColumn({name: "file_id"})
    file: FileRecord[]
}

