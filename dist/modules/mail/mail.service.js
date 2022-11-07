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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const token_service_1 = require("../auth/token/token.service");
let MailService = class MailService {
    constructor(mailerService, tokenService) {
        this.mailerService = mailerService;
        this.tokenService = tokenService;
    }
    async sendVerificationEmail(password, agent, tenantName) {
        const token = await this.tokenService.createVerifyToken(agent.id);
        const url = `https://54.255.21.238.nip.io/api/v1/auth/confirm?token=${token}`;
        return await this.mailerService.sendMail({
            to: agent.email,
            subject: 'Omicall! You have been invite',
            template: './confirmation',
            context: {
                name: agent.fullName,
                tenant: tenantName,
                email: agent.email,
                password: password,
                url: url,
            },
        });
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        token_service_1.TokenService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map