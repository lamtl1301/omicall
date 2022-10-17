import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { Agent } from './entities/agent.entity';
import { Role } from './entities/role.entity';
import bcrypt from 'bcrypt'
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';
import { PageMetaDto } from 'src/common/page-meta.dto';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) { }

  async create(tenant_id: string, createAgentDto: CreateAgentDto) {
    try {
      const agent = this.agentRepository.create(createAgentDto);
      let password = agent.password
      if (agent.password.length == 0) {
        password = Math.random().toString(36).slice(-8);
      } else {
        agent.isFirstLogin = false;
      }
        console.log(password)
        let hashedPassword = await bcrypt.hash(password, 12)
        //let hashedPassword = randomPassword
        agent.password = hashedPassword;
        agent.createAt = new Date();
        agent.updatedAt = new Date();
      return this.agentRepository.save(agent);
    } catch (error) {
      throw error
    }
  }

  async getListAgent( pageOptionsDto: PageOptionsDto): Promise<PageDto<Agent>> {
    const queryBuilder = this.agentRepository.createQueryBuilder("agent");
    queryBuilder
      .orderBy("agent.createAt", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
    const itemCount = await queryBuilder.getCount()
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto});
    return new PageDto(entities, pageMetaDto)
  }

  async getById(id: number) {
    // try {
    //   return this.agentRepository.findOneByOrFail({ id });
    // } catch (error) {
    //   throw error
    // }
    return this.agentRepository.findOneByOrFail({ id});
  }
  async getByEmail(email: string) {
    try {
      return this.agentRepository.findOneBy({ email })
    } catch (error) {
      throw error
    }
  }


  async update(id: number, tenant_id: string, updateAgentDto: UpdateAgentDto) {
    try {
      const agent = await this.agentRepository.findOneOrFail({
        where: {
          tenantID: tenant_id,
          id: id
        }
      })
      if (agent) {
        let message;
        if (updateAgentDto.password.length > 0) {
          let hashedPassword = await bcrypt.hash(updateAgentDto.password, 12)
          agent.password = hashedPassword;
          agent.isFirstLogin = false;
          agent.isActived = true;
          message = "Change Agent password successfully"
        } else {
          agent.fullName = updateAgentDto.fullName;
          agent.gender = updateAgentDto.gender;
          message = "Agent update successfully"
        }
        agent.updatedAt = new Date()
        this.agentRepository.update(id, agent);
        return message
      } else {
        throw new NotFoundException()
      }
    } catch (error) {
      throw error;
    }

  }

  async remove(id: number,tenant_id: string) {
    try {
      const agent = await this.agentRepository.findOneOrFail({
        where: {
          tenantID: tenant_id,
          id: id
        }
      });
      if (agent) {
        agent.isDeleted = true;
        agent.isActived = false;
        this.agentRepository.update(id, agent)
        return "Agent delete successfully"
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      throw error
    }
  }
}
