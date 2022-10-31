import { AuthService } from './auth.service';
import { PreLoginDto } from './dto/prelogin.dto';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    prelogin(preloginDto: PreLoginDto): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        user: import("../agent/entities/agent.entity").Agent;
        token: {
            accessToken: string;
            refreshToken: string;
        };
        projectID: number;
    }>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(LogoutDto: LogoutDto): Promise<void>;
}
