import { BaseEntity } from 'src/common/base.entity';
import { FileRecord } from './file.entity';
export declare class HistoryCall extends BaseEntity {
    agentID: number;
    fileID: number;
    projectNumberID: number;
    customerNumberID: number;
    timeStartToAnswer: number;
    duration: number;
    disposition: string;
    file: FileRecord[];
}
