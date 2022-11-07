import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';
import { Tenant } from './entities/tenant.entity';
import { User } from 'src/decorator/user.decorator';

@ApiTags('Tenant')
@ApiBearerAuth()
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get()
  getListTenant(
    @User('id') userID: number,
    @Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<Tenant>> {
    return this.tenantService.getListTenant(pageOptionsDto, userID);
  }

  @Get(':id')
  getTenant(@Param('id') id: string) {
    return this.tenantService.findById(id);
  }

  @Post()
  create(
    @User('id') userID: number,
    @Body() createTenantDto: CreateTenantDto) {
    console.log(createTenantDto instanceof CreateTenantDto)
    return this.tenantService.create(userID, createTenantDto);
  }

  @Patch(':id')
  update(@Param('tenantID') tenantID: string, 
    @Body() updateTenantDto: UpdateTenantDto,
    @User('id') userID : number
    ) {
    return this.tenantService.update(tenantID, updateTenantDto, userID);
  }

  @Delete(':id')
  remove(@Param('tenantID') tenantID: string,
    @User('id') userID: number
  ) {
    return this.tenantService.remove(tenantID, userID);
  }
}
