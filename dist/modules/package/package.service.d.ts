import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { PageDto } from 'src/common/pagination.dto';
import { Repository } from 'typeorm';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './entities/package.entity';
export declare class PackageService {
    private readonly packageRepository;
    constructor(packageRepository: Repository<Package>);
    create(createPackageDto: CreatePackageDto): Promise<Package>;
    getListPackage(pageOptionsDto: PageOptionsDto): Promise<PageDto<Package>>;
    getById(id: number): Promise<Package>;
    update(id: number, updatePackageDto: UpdatePackageDto): Promise<any>;
    remove(id: number): Promise<void>;
}
