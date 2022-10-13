import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';

import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent } from './entities/agent.entity';


@ApiTags('Agents')
@ApiBearerAuth()
@Controller('agents')
export class AgentController {
  constructor(private readonly agentService: AgentService) { }

  // @ApiBadRequestResponse({ description: 'Bad request' })
  // @Get('')
  // getListAgent( @Query() paginationDto: PaginationDto ) {
  //   return this.agentService.getListAgent(paginationDto);
  // }//@Param('tenant_id')tenant_id: string,

  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get()
  getListAgent(
    @Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<Agent>> {
      return this.agentService.getListAgent(pageOptionsDto)
    }

  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.agentService.getById(+id);
  }

  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post('')
  create(@Param() tenant_id: string,
    @Body() createAgentDto: CreateAgentDto) {
    return this.agentService.create(tenant_id,createAgentDto);
  }

  @ApiOkResponse({ description: 'Agent update successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Patch(':id')
  update(@Param('id') id: string,
        @Param('tenant_id') tenant_id: string,
        @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentService.update(+id, tenant_id, updateAgentDto);
  }

  @ApiOkResponse({ description: 'Agent delete successfully' })
  @ApiBadRequestResponse()
  @Delete(':id')
  remove(@Param('id') id: string, @Param('tenant_id') tenant_id: string) {
    return this.agentService.remove(+id, tenant_id);
  }
}
