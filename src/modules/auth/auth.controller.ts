import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/public.decorator';
import { AuthService } from './auth.service';
import { PreLoginDto } from './dto/prelogin.dto';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('prelogin')
  async prelogin(@Body() preloginDto: PreLoginDto){
    return await this.authService.prelogin(preloginDto.email, preloginDto.password);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto){
    return await this.authService.login(loginDto.agentID, loginDto.projectID);
  }

  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto){
    return await this.authService.refreshTokens(refreshTokenDto.token)
  }

  @Post('logout')
  async logout(@Body() LogoutDto: LogoutDto){
    return await this.authService.logout(LogoutDto.agent_id)
  }

}
