import { HistoryCall } from './call.entity';
import { FileType } from './file-type.entity';
export declare class FileRecord {
    id: number;
    fileName: string;
    fileTypeID: number;
    recordSeconds: number;
    isDeleted: boolean;
    fileType: FileType;
    historyCall: HistoryCall;
}
