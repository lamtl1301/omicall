import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from '../agent/entities/agent.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnviromentVariables } from 'src/interface/env.interface';
import { JwtStrategy } from './jwt.strategy';
import { AgentModule } from '../agent/agent.module';



@Module({
  imports: [
  forwardRef(() => AgentModule),

  TypeOrmModule.forFeature([Agent]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    
    useFactory: async (configService: ConfigService<EnviromentVariables>) => ({
      secret: configService.get<string>('JWT_SERECT')
    }),
    inject: [ConfigService],
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
