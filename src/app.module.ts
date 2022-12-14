import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AgentModule } from './modules/agent/agent.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import dataSource, { dataSourceOptions } from './config/ormconfig';
import { CustomerModule } from './modules/customer/customer.module';
import { PhoneNumberModule } from './modules/phone-number/phone-number.module';
import { ProjectModule } from './modules/project/project.module';
import { CallModule } from './modules/call/call.module';
import { RoleModule } from './modules/role/role.module';
import { MailModule } from './modules/mail/mail.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    
    TypeOrmModule.forRoot(dataSourceOptions),
    AgentModule,
    TenantModule,
    AuthModule,
    CustomerModule,
    PhoneNumberModule,
    ProjectModule,
    CallModule,
    RoleModule,
    MailModule,
    
  ],
  controllers: [AppController],
  providers: [AppService,
  {
    provide: APP_GUARD, useClass: JwtAuthGuard
  }],
})
export class AppModule {
}
