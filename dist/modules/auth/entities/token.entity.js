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
exports.Token = exports.TokenType = void 0;
const openapi = require("@nestjs/swagger");
const agent_entity_1 = require("../../agent/entities/agent.entity");
const typeorm_1 = require("typeorm");
var TokenType;
(function (TokenType) {
    TokenType["REFRESH_TOKEN"] = "refresh_token";
    TokenType["VERIFY_EMAIL"] = "verify_email";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
let Token = class Token {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, type: { required: true, enum: require("./token.entity").TokenType }, expiresIn: { required: true, type: () => Date }, agentID: { required: true, type: () => Number }, agent: { required: true, type: () => require("../../agent/entities/agent.entity").Agent } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Token.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: TokenType
    }),
    __metadata("design:type", String)
], Token.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "expires_in" }),
    __metadata("design:type", Date)
], Token.prototype, "expiresIn", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "agent_id" }),
    __metadata("design:type", Number)
], Token.prototype, "agentID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => agent_entity_1.Agent, (agent) => agent.token),
    (0, typeorm_1.JoinColumn)({ name: "agent_id" }),
    __metadata("design:type", agent_entity_1.Agent)
], Token.prototype, "agent", void 0);
Token = __decorate([
    (0, typeorm_1.Entity)()
], Token);
exports.Token = Token;
//# sourceMappingURL=token.entity.js.map