"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const agent_service_1 = require("../agent/agent.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const token_service_1 = require("./token/token.service");
const project_service_1 = require("../project/project.service");
const tenant_service_1 = require("../tenant/tenant.service");
let AuthService = class AuthService {
    constructor(agentService, tokenService, projectService, tenantService, jwtService, configService) {
        this.agentService = agentService;
        this.tokenService = tokenService;
        this.projectService = projectService;
        this.tenantService = tenantService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validateUser(id) {
        const user = await this.agentService.getById(id);
        return user;
    }
    async prelogin(email, password) {
        try {
            const user = await this.agentService.getByEmail(email);
            if (user && bcrypt_1.default.compare(password, user.password) && user.isDeleted == false) {
                const tenant = await this.tenantService.findById(user.tenantID);
                if (tenant && tenant.isVihat == true) {
                    const token = await this.tokenService.createAuthToken(user.id);
                    return { user, token };
                }
                else {
                    const listProject = await this.projectService.getListProjectOfAgent(user);
                    return { user, tenant, listProject };
                }
            }
            else {
                throw new common_1.ForbiddenException('Access denied');
            }
        }
        catch (error) {
            throw error;
        }
    }
    async login(agentId, projectID) {
        try {
            const user = await this.agentService.getById(agentId);
            if (user && user.isActived == true) {
                const token = await this.tokenService.createAuthToken(user.id);
                return { user, token, projectID };
            }
            else {
                throw new common_1.ForbiddenException('Access denied');
            }
        }
        catch (error) {
            throw error;
        }
    }
    async refreshTokens(refreshToken) {
        try {
            return this.tokenService.refresh(refreshToken);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Access denied');
        }
    }
    async logout(agent_id) {
        try {
            return this.tokenService.remove(agent_id);
        }
        catch (error) {
            throw error;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [agent_service_1.AgentService,
        token_service_1.TokenService,
        project_service_1.ProjectService,
        tenant_service_1.TenantService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map