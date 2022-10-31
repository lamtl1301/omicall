import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgentService } from '../agent/agent.service';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';
import { HistoryCall } from './entities/call.entity';
import { FileType } from './entities/file-type.entity';
import { FileRecord } from './entities/file.entity';

@Injectable()
export class CallService {
  constructor (
    @InjectRepository(HistoryCall)
    private readonly historyRepository: Repository<HistoryCall>,
    @InjectRepository(FileType)
    private readonly fileTypeRepository: Repository<FileType>,
    @InjectRepository(FileRecord)
    private readonly fileRecordRepository: Repository<FileRecord>,

    private readonly agentService: AgentService
  ) {}
  
  async create(createCallDto: CreateCallDto) {
  //   const newHistory = this.historyRepository.create(createCallDto); //viet lai dto
  //   //create file to database 
  //   const fileRecord = this.fileTypeRepository.create({
  //     typeName: createCallDto.
  //   })
  //   return this.historyRepository.save(newHistory) 
  }

  findAll() {
  
  }

  findOne(id: number) {
    return `This action returns a #${id} call`;
  }

  update(id: number, updateCallDto: UpdateCallDto) {
    return `This action updates a #${id} call`;
  }

  remove(id: number) {
    return `This action removes a #${id} call`;
  }
}
