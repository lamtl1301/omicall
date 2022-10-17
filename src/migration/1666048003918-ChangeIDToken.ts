import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeIDToken1666048003918 implements MigrationInterface {
    name = 'ChangeIDToken1666048003918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Agent" DROP CONSTRAINT "FK_4f541cc859639c4520582225837"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP CONSTRAINT "FK_b64a8623b75d07abb01ed86b286"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "is_first_login"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "is_actived"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "tag_id"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "tenant_id"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "full_name" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "is_first_login" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "is_actived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "gender" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "tag_id" integer`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "role_id" integer`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "tenant_id" integer`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "PK_82fae97f905930df5d62a702fc9"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "token" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD CONSTRAINT "FK_4f541cc859639c4520582225837" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD CONSTRAINT "FK_b64a8623b75d07abb01ed86b286" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Agent" DROP CONSTRAINT "FK_b64a8623b75d07abb01ed86b286"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP CONSTRAINT "FK_4f541cc859639c4520582225837"`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "PK_82fae97f905930df5d62a702fc9"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "token" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "tenant_id"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "tag_id"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "is_actived"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "is_first_login"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "gender" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "full_name" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "tenant_id" integer`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "role_id" integer`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "tag_id" integer`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "is_actived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "is_first_login" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD CONSTRAINT "FK_b64a8623b75d07abb01ed86b286" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD CONSTRAINT "FK_4f541cc859639c4520582225837" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
