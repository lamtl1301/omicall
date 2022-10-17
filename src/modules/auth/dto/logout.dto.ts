import { IsString } from 'class-validator';

export class LogoutDto {
  @IsString()
  agent_id: number;
}