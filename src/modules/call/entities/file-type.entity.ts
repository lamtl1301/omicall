import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FileRecord } from './file.entity';

@Entity()
export class FileType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "type_name"})
    typeName: string;

    @Column({name: "description"})
    description: string

    @OneToMany((type) => FileRecord, (fileRecord) => fileRecord.fileType)
    file: FileRecord[]
}
