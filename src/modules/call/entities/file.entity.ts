import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { HistoryCall } from './call.entity';
import { FileType } from './file-type.entity';

@Entity()
export class FileRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "file_name"})
    fileName: string;

    @Column({name: "file_type_id"})
    fileTypeID: number;

    @Column({name: "record_seconds"})
    recordSeconds: number;

    @Column({name: "is_deleted", default:"false"})
    isDeleted: boolean

    @ManyToOne((type) => FileType, (fileType) => fileType.file)
    @JoinColumn({name: "file_type_id"})
    fileType: FileType

    @ManyToOne((type) => HistoryCall, (historyCall) => historyCall.file)
    historyCall: HistoryCall
}
