import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Tenant } from '../tenant/entities/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Customer, Tenant])],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService]
})
export class ProjectModule {}
