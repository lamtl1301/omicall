import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageMetaDto } from 'src/common/page-meta.dto';
import { PageDto } from 'src/common/pagination.dto';
import { Repository } from 'typeorm';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './entities/package.entity';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
  ){}
  
  create(createPackageDto: CreatePackageDto) {
    try {
        const newPackage = this.packageRepository.create(createPackageDto);
        return this.packageRepository.save(newPackage)
    } catch (error) {
        throw error
    }
  }

  async getListPackage( pageOptionsDto: PageOptionsDto): Promise<PageDto<Package>> {
    const queryBuilder = this.packageRepository.createQueryBuilder("package");
    queryBuilder
      .orderBy("package.createAt", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
    const itemCount = await queryBuilder.getCount()
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto});
    return new PageDto(entities, pageMetaDto)
  }

  async getById(id: number) {
    try {
      return this.packageRepository.findOneByOrFail( { id })
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updatePackageDto: UpdatePackageDto) {
    try {
      let message;
      const packageUpdate = await this.getById(id);
      if (packageUpdate) {
        packageUpdate.service_name = updatePackageDto.service_name;
        packageUpdate.description = updatePackageDto.description;
        packageUpdate.price = updatePackageDto.price;
        packageUpdate.customerNum = updatePackageDto.customer_num;
        packageUpdate.staffNum = updatePackageDto.staff_num;
        packageUpdate.packageExpire = updatePackageDto.package_expire; //number of unit
        packageUpdate.expireUnit = updatePackageDto.expire_unit; //month, year
        packageUpdate.updatedAt = new Date()
        message = "Package update successfully";
        this.packageRepository.update(id, packageUpdate);
        return message;
      } else { 
        throw new NotFoundException()
      }
    } catch (error) {
      throw error
    }

  }

  async remove(id: number) {
    const packageRemove = await this.getById(id);
    // if (projectPackageRepo.find(where package.i))
    try {
      packageRemove.isDeleted = true;
      packageRemove.isEnabled = false;
      this.packageRepository.update(id, packageRemove)
    } catch (error) {
      throw error
    }
  }
}
