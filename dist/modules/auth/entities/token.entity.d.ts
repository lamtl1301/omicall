import { Agent } from 'src/modules/agent/entities/agent.entity';
export declare enum TokenType {
    REFRESH_TOKEN = "refresh_token",
    VERIFY_EMAIL = "verify_email"
}
export declare class Token {
    id: string;
    type: TokenType;
    expiresIn: Date;
    agentID: number;
    agent: Agent;
}
