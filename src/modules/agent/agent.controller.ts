import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';
import { User } from 'src/decorator/user.decorator';
import { MailService } from '../mail/mail.service';

import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent } from './entities/agent.entity';


@ApiTags('Agents')
@ApiBearerAuth()
@Controller(':tenantID/agents')
export class AgentController {
  constructor(
    private readonly agentService: AgentService,
    private mailService: MailService,
    ) { }

  // @ApiBadRequestResponse({ description: 'Bad request' })
  // @Get('')
  // getListAgent( @Query() paginationDto: PaginationDto ) {
  //   return this.agentService.getListAgent(paginationDto);
  // }//@Param('tenant_id')tenant_id: string,

  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get()
  getListAgent(
    @User('tenantID') tenantID: string,
    @Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<Agent>> {
      return this.agentService.getListAgent(tenantID, pageOptionsDto)
    }

  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.agentService.getById(+id);
  }

  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post('')
  async create(@User('tenantID') tenantID: string,
    @Body() createAgentDto: CreateAgentDto) {
    const dataAgent = await this.agentService.createAgent(tenantID,createAgentDto);
    console.log("dataAgent", dataAgent)
    const agentCreated = dataAgent.createdAgent
    await this.mailService.sendVerificationEmail(dataAgent.password, dataAgent.createdAgent, dataAgent.tenantName)
    return {agentCreated}
  }

  @ApiOkResponse({ description: 'Agent update successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Patch(':id')
  update(@Param('id') id: string,
        @User('tenantID') tenantID: string,
        @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentService.update(+id, tenantID, updateAgentDto);
  }

  @ApiOkResponse({ description: 'Agent delete successfully' })
  @ApiBadRequestResponse()
  @Delete(':id')
  remove(@Param('id') id: string, @User('tenantID') tenantID: string) {
    return this.agentService.remove(+id, tenantID);
  }
}
