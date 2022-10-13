// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { PageOptionsDto } from 'src/common/dto/page-option.dto';
// import { PageMetaDto } from 'src/common/page-meta.dto';
// import { PageDto } from 'src/common/pagination.dto';
// import { Repository } from 'typeorm';
// import { CreatePackageDto } from './dto/create-package.dto';
// import { UpdatePackageDto } from './dto/update-package.dto';
// import { Package } from './entities/package.entity';

// @Injectable()
// export class PackageService {
//   constructor(
//     @InjectRepository(Package)
//     private readonly packageRepository: Repository<Package>,
//   ){}
  
//   create(createPackageDto: CreatePackageDto) {
//     return 'This action adds a new package';
//   }

//   async getListPackage( pageOptionsDto: PageOptionsDto): Promise<PageDto<Package>> {
//     const queryBuilder = this.packageRepository.createQueryBuilder("package");
//     queryBuilder
//       .orderBy("package.createAt", pageOptionsDto.order)
//       .skip(pageOptionsDto.skip)
//       .take(pageOptionsDto.take)
//     const itemCount = await queryBuilder.getCount()
//     const { entities } = await queryBuilder.getRawAndEntities();
//     const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto});
//     return new PageDto(entities, pageMetaDto)
//   }

//   async getById(id: number) {
//     try {
//       return this.packageRepository.findOneByOrFail( { id })
//     } catch (error) {
//       throw error
//     }
//     return `This action returns a #${id} package`;
//   }

//   async update(id: number, updatePackageDto: UpdatePackageDto) {
//     try {
//       const package = this.packageRepository.findOneByOrFail
//     } catch (error) {
//       throw error
//     }
//     return `This action updates a #${id} package`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} package`;
//   }
// }
