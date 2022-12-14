import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
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
import { MailService } from '../mail/mail.service';
import { TenantService } from '../tenant/tenant.service';


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
    private readonly attributeRepository: Repository<Attribute>,
    @Inject(forwardRef(() => TenantService))
    private readonly tenantService: TenantService,
    private readonly mailService: MailService,
  ) { }

  async createAgent(tenantID: string, createAgentDto: CreateAgentDto) {
    try {
      const checkAgent = await this.agentRepository.findOne({
        where: {
          email: createAgentDto.email,
          tenantID: tenantID
        }
      })
      if (checkAgent && !checkAgent.isDeleted && checkAgent.isActived) {
          throw new BadRequestException('Agent is actived in tenant')
      } else {
        const agent = this.agentRepository.create({
          email: createAgentDto.email,
          password: createAgentDto.password,
          tenantID: tenantID
        });
        let password = createAgentDto.password
        if (password.trim().length == 0) {
          password = Math.random().toString(36).slice(-8);
          agent.isFirstLogin = false;
        } else {
          agent.isFirstLogin = true;
        }
        console.log(password)
        let hashedPassword = await bcrypt.hash(password, 12)
        //let hashedPassword = randomPassword
        agent.password = hashedPassword;
        agent.createAt = new Date();
        agent.updatedAt = new Date();
        //agent.isOwner = true
        const createdAgent = await this.agentRepository.save(agent);
        const tenant = await this.tenantService.findById(agent.tenantID)
        const tenantName = tenant.fullName
        return { createdAgent, tenantName, password }
      }
    } catch (error) {
      throw error
    }
  }


  async getListAgentOfTenant(tenantID: string) {
    return this.agentRepository.find({
      where: {
        tenantID: tenantID
      }
    })
  }



  async getListAgent(tenantID: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<Agent>> {
    const queryBuilder = this.agentRepository.createQueryBuilder("agent");
    queryBuilder
      .where("agent.tenant_id = :q", { q: tenantID })
      .orderBy("agent.createAt", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
    const itemCount = await queryBuilder.getCount()
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto)
  }

  async getById(id: number) {
    // try {
    //   return this.agentRepository.findOneByOrFail({ id });
    // } catch (error) {
    //   throw error
    // }
    return this.agentRepository.findOneBy({ id });
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
          updateAgentDto.attribute.forEach(async attributeElement => {
            // id == null => create new 
            if (attributeElement.id === null || typeof (attributeElement.id) == null) {
              // create new
              const newAttribute = await this.attributeRepository.create({
                id: attributeElement.id,
                attributeName: attributeElement.key
              })
              this.agentAttributeRepository.create({
                attributeID: newAttribute.id,
                agentID: id,
                value: attributeElement.value
              })
            } else {
              // id != null => update attribute
              const agentAttributeRecord = await this.agentAttributeRepository.findOne({
                where: {
                  id: attributeElement.id,
                  agentID: id
                }
              })
              if (agentAttributeRecord) {
                agentAttributeRecord.value = attributeElement.value;
                const attributeRecord = await this.attributeRepository.findOne({
                  where: {
                    id: agentAttributeRecord.attributeID
                  }
                })
                attributeRecord.attributeName = attributeElement.key
                this.attributeRepository.save(attributeRecord)
                this.agentAttributeRepository.save(agentAttributeRecord)
              }

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

  async remove(id: number, tenantID: string) {
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

  async activedAgent(agentID: number){
    const agent = await this.getById(agentID);
    if (agent) {
      agent.isActived = true;
      return await this.agentRepository.save(agent);
    }
  }
}
