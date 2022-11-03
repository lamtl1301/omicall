import { HistoryCall } from './call.entity';
export declare class FileRecord {
    id: number;
    fileName: string;
    fileTypeID: number;
    recordSeconds: number;
    isDeleted: boolean;
    historyCall: HistoryCall;
}
