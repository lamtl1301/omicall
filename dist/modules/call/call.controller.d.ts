import { CallService } from './call.service';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';
export declare class CallController {
    private readonly callService;
    constructor(callService: CallService);
    create(createCallDto: CreateCallDto): Promise<void>;
    findAll(): void;
    findOne(id: string): string;
    update(id: string, updateCallDto: UpdateCallDto): string;
    remove(id: string): string;
}
