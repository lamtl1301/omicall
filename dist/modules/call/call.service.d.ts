import { Repository } from 'typeorm';
import { AgentService } from '../agent/agent.service';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';
import { HistoryCall } from './entities/call.entity';
import { FileRecord } from './entities/file.entity';
export declare class CallService {
    private readonly historyRepository;
    private readonly fileRecordRepository;
    private readonly agentService;
    constructor(historyRepository: Repository<HistoryCall>, fileRecordRepository: Repository<FileRecord>, agentService: AgentService);
    create(createCallDto: CreateCallDto): Promise<void>;
    findAll(): void;
    findOne(id: number): string;
    update(id: number, updateCallDto: UpdateCallDto): string;
    remove(id: number): string;
}
