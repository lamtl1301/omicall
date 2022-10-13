import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnviromentVariables } from "src/interface/env.interface";
import { JWTPayload } from "src/interface/jwt.interface";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService,
        private configService: ConfigService<EnviromentVariables>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SERECT'),
        })
    }
    async validate(payload: JWTPayload){
        const user = this.authService.validateUser(payload.sub)
        return user;
    }
}