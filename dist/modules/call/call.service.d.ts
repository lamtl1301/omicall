import { Repository } from 'typeorm';
import { AgentService } from '../agent/agent.service';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';
import { HistoryCall } from './entities/call.entity';
import { FileType } from './entities/file-type.entity';
import { FileRecord } from './entities/file.entity';
export declare class CallService {
    private readonly historyRepository;
    private readonly fileTypeRepository;
    private readonly fileRecordRepository;
    private readonly agentService;
    constructor(historyRepository: Repository<HistoryCall>, fileTypeRepository: Repository<FileType>, fileRecordRepository: Repository<FileRecord>, agentService: AgentService);
    create(createCallDto: CreateCallDto): Promise<void>;
    findAll(): void;
    findOne(id: number): string;
    update(id: number, updateCallDto: UpdateCallDto): string;
    remove(id: number): string;
}
