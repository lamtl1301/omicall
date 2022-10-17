import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { Package } from './entities/package.entity';
import { PageDto } from 'src/common/pagination.dto';


@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.packageService.create(createPackageDto);
  }

  @Get()
  async getListPackage(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<Package>> {
    return this.packageService.getListPackage(pageOptionsDto);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.packageService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePackageDto: UpdatePackageDto) {
    return this.packageService.update(id, updatePackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.packageService.remove(id);
  }
}
