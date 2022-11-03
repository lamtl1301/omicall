import { MigrationInterface, QueryRunner } from "typeorm";
export declare class NewDatabase1667285604848 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
