import { MigrationInterface, QueryRunner } from "typeorm";
export declare class TokenMigration1665745744234 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
