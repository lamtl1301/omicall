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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const moment_1 = __importDefault(require("moment"));
const typeorm_2 = require("typeorm");
const token_entity_1 = require("../entities/token.entity");
const crypto_1 = __importDefault(require("crypto"));
let TokenService = class TokenService {
    constructor(tokenRepositoy, jwtService, configService) {
        this.tokenRepositoy = tokenRepositoy;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async createJWTToken(id, expire) {
        const payload = {
            sub: id,
            iat: (0, moment_1.default)().unix(),
            exp: expire.unix(),
        };
        return this.jwtService.sign(payload);
    }
    async createToken(id, type) {
        const tokenId = crypto_1.default.randomBytes(24).toString('hex');
        let expiresIn = new Date();
        switch (type) {
            case token_entity_1.TokenType.REFRESH_TOKEN: {
                expiresIn = (0, moment_1.default)()
                    .add(this.configService.get('REFRESH_TOKEN_EXPIRATION_DAYS'), 'days')
                    .toDate();
                break;
            }
            case token_entity_1.TokenType.VERIFY_EMAIL: {
                expiresIn = (0, moment_1.default)()
                    .add(this.configService.get('VERIFY_EMAIL_TOKEN_EXPIRATION_MINUTES'), 'day')
                    .toDate();
                break;
            }
        }
        const token = this.tokenRepositoy.create({
            id: tokenId,
            type: type,
            expiresIn: expiresIn,
            agentID: id
        });
        this.tokenRepositoy.save(token);
        return tokenId;
    }
    async createRefreshToken(agent_id) {
        return this.createToken(agent_id, token_entity_1.TokenType.REFRESH_TOKEN);
    }
    async verifyJWTToken(token) {
        return this.jwtService.verify(token);
    }
    async createAuthToken(id) {
        const accessTokenExpires = (0, moment_1.default)().add(this.configService.get('ACCESS_TOKEN_EXPIRATION_MINUTES'), 'minutes');
        const accessToken = await this.createJWTToken(id, accessTokenExpires);
        console.log(accessToken);
        const refreshToken = await this.createRefreshToken(id);
        console.log(refreshToken);
        return { accessToken,
            refreshToken,
        };
    }
    async refresh(refreshToken) {
        try {
            const token = await this.tokenRepositoy.findOneOrFail({
                where: {
                    id: refreshToken
                }
            });
            const newToken = this.createAuthToken(token.agentID);
            await this.tokenRepositoy.remove(token);
            return newToken;
        }
        catch (error) {
            throw error;
        }
    }
    async getTokenByID(agent_id, type) {
        return this.tokenRepositoy.findOneOrFail({
            where: {
                agentID: agent_id,
                type: type
            }
        });
    }
    async remove(agent_id) {
        try {
            const token = await this.getTokenByID(agent_id, token_entity_1.TokenType.REFRESH_TOKEN);
            this.tokenRepositoy.remove(token);
        }
        catch (error) {
            throw error;
        }
    }
};
TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(token_entity_1.Token)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map