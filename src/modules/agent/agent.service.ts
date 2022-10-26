import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { Agent } from './entities/agent.entity';
import { Role } from '../role/entities/role.entity';
import bcrypt from 'bcrypt'
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';
import { PageMetaDto } from 'src/common/page-meta.dto';
import { AgentAttribute } from '../attribute/entities/agent-attribute.entity';
import { Attribute } from '../attribute/entities/attribute.entity';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(AgentAttribute)
    private readonly agentAttributeRepository: Repository<AgentAttribute>,
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>
  ) { }

  async create(tenantID: string, createAgentDto: CreateAgentDto) {
    try {
      const checkAgent = await this.agentRepository.findOne({
        where: {
          email: createAgentDto.email,
          tenantID: tenantID
        }
      })
      if (checkAgent){
        checkAgent.isActived = true;
        checkAgent.isDeleted = false
        return this.agentRepository.save(checkAgent)
      } else{
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
          //create default role with permission = agent
          //
        return this.agentRepository.save(agent);
      }
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


  async update(id: number, tenantID: string, updateAgentDto: UpdateAgentDto) {
    try {
      const agent = await this.agentRepository.findOneOrFail({
        where: {
          tenantID: tenantID,
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
          updateAgentDto.attribute.forEach( async attributeElement => {
            const agentAttributeRecord = await this.agentAttributeRepository.findOne({
              where: {
                id: attributeElement.id,
                agentID: id
              }
            })
            if (agentAttributeRecord){
              agentAttributeRecord.value = attributeElement.value;
              const attributeRecord = await this.attributeRepository.findOne({
                where: {
                  id: agentAttributeRecord.attributeID
                }
              })
              attributeRecord.attributeName = attributeElement.key
              this.attributeRepository.save(attributeRecord)
              this.agentAttributeRepository.save(agentAttributeRecord)
            } else {
              const newAttribute = await this.attributeRepository.create({
                id: attributeElement.id,
                attributeName: attributeElement.key
              })
              this.agentAttributeRepository.create({
                attributeID: newAttribute.id,
                agentID: id,
                value: attributeElement.value
              })
            }
          })
          
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

  async remove(id: number,tenantID: string) {
    try {
      const agent = await this.agentRepository.findOneOrFail({
        where: {
          tenantID: tenantID,
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
