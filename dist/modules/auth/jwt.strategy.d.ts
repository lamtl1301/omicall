import { ConfigService } from "@nestjs/config";
import { EnviromentVariables } from "src/interface/env.interface";
import { JWTPayload } from "src/interface/jwt.interface";
import { AuthService } from "./auth.service";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    private configService;
    constructor(authService: AuthService, configService: ConfigService<EnviromentVariables>);
    validate(payload: JWTPayload): Promise<import("../agent/entities/agent.entity").Agent>;
}
export {};
