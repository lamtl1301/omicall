import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PageOptionsDto } from 'src/common/dto/page-option.dto';
import { Package } from './entities/package.entity';
import { PageDto } from 'src/common/pagination.dto';
export declare class PackageController {
    private readonly packageService;
    constructor(packageService: PackageService);
    create(createPackageDto: CreatePackageDto): Promise<Package>;
    getListPackage(pageOptionsDto: PageOptionsDto): Promise<PageDto<Package>>;
    getById(id: number): Promise<Package>;
    update(id: number, updatePackageDto: UpdatePackageDto): Promise<any>;
    remove(id: number): Promise<void>;
}
