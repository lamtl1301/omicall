import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAttribute1666667921000 implements MigrationInterface {
    name = 'AddAttribute1666667921000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Agent" DROP CONSTRAINT "FK_4f541cc859639c4520582225837"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP CONSTRAINT "FK_b64a8623b75d07abb01ed86b286"`);
        await queryRunner.query(`ALTER TABLE "Role" DROP CONSTRAINT "FK_9f4b09fc05dee164fcce24c67cd"`);
        await queryRunner.query(`CREATE TABLE "base_attribute" ("id" SERIAL NOT NULL, "attribute_id" integer NOT NULL, "value" character varying NOT NULL, "is_deleted" boolean NOT NULL, CONSTRAINT "PK_114f0281d198021452d8007ea9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agent_role" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP, "updatedAt" TIMESTAMP, "agent_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_306c47e4a4c59701a7308ba7c73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_attribute" ("id" SERIAL NOT NULL, "attribute_id" integer NOT NULL, "value" character varying NOT NULL, "is_deleted" boolean NOT NULL, "project_id" integer NOT NULL, "display_index" integer NOT NULL, CONSTRAINT "PK_0924c09018ae3de597476ff3189" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attribute" ("id" integer NOT NULL, "attribute_name" character varying NOT NULL, CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agent_attribute" ("id" SERIAL NOT NULL, "attribute_id" integer NOT NULL, "value" character varying NOT NULL, "is_deleted" boolean NOT NULL, "agent_id" integer NOT NULL, "display_index" integer NOT NULL, CONSTRAINT "PK_7ceef58250fe9bc7e8bd53fb21a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "is_first_login"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "is_actived"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "tag_id"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "tenant_id"`);
        await queryRunner.query(`ALTER TABLE "Role" DROP COLUMN "tenant_id"`);
        await queryRunner.query(`ALTER TABLE "Role" ADD "is_owner" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Role" ADD "project_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Role" ADD "permission" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Role" ADD "role_level" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "full_name" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "is_first_login" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "is_actived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "gender" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "tag_id" integer`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "tenant_id" integer`);
        await queryRunner.query(`ALTER TABLE "agent_role" ADD CONSTRAINT "FK_2dd7af009bca884cb059c5a2b56" FOREIGN KEY ("agent_id") REFERENCES "Agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent_role" ADD CONSTRAINT "FK_9bd4579902984188e7523bb6f6a" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Role" ADD CONSTRAINT "FK_b80b1573a6a91b4aaf650150c2f" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_attribute" ADD CONSTRAINT "FK_568b72936e4c061fe4478acbfcd" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_attribute" ADD CONSTRAINT "FK_d813fc46853614b568da22db232" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent_attribute" ADD CONSTRAINT "FK_5a348e5945e4b934b8a1556e269" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent_attribute" ADD CONSTRAINT "FK_674f0b57afed3a1dd5a9a0f0051" FOREIGN KEY ("agent_id") REFERENCES "Agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD CONSTRAINT "FK_b64a8623b75d07abb01ed86b286" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Agent" DROP CONSTRAINT "FK_b64a8623b75d07abb01ed86b286"`);
        await queryRunner.query(`ALTER TABLE "agent_attribute" DROP CONSTRAINT "FK_674f0b57afed3a1dd5a9a0f0051"`);
        await queryRunner.query(`ALTER TABLE "agent_attribute" DROP CONSTRAINT "FK_5a348e5945e4b934b8a1556e269"`);
        await queryRunner.query(`ALTER TABLE "project_attribute" DROP CONSTRAINT "FK_d813fc46853614b568da22db232"`);
        await queryRunner.query(`ALTER TABLE "project_attribute" DROP CONSTRAINT "FK_568b72936e4c061fe4478acbfcd"`);
        await queryRunner.query(`ALTER TABLE "Role" DROP CONSTRAINT "FK_b80b1573a6a91b4aaf650150c2f"`);
        await queryRunner.query(`ALTER TABLE "agent_role" DROP CONSTRAINT "FK_9bd4579902984188e7523bb6f6a"`);
        await queryRunner.query(`ALTER TABLE "agent_role" DROP CONSTRAINT "FK_2dd7af009bca884cb059c5a2b56"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "tenant_id"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "tag_id"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "is_actived"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "is_first_login"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "Role" DROP COLUMN "role_level"`);
        await queryRunner.query(`ALTER TABLE "Role" DROP COLUMN "permission"`);
        await queryRunner.query(`ALTER TABLE "Role" DROP COLUMN "project_id"`);
        await queryRunner.query(`ALTER TABLE "Role" DROP COLUMN "is_owner"`);
        await queryRunner.query(`ALTER TABLE "Role" ADD "tenant_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "tenant_id" integer`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "role_id" integer`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "tag_id" integer`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "gender" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "is_actived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "is_first_login" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "full_name" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "password" character varying`);
        await queryRunner.query(`DROP TABLE "agent_attribute"`);
        await queryRunner.query(`DROP TABLE "attribute"`);
        await queryRunner.query(`DROP TABLE "project_attribute"`);
        await queryRunner.query(`DROP TABLE "agent_role"`);
        await queryRunner.query(`DROP TABLE "base_attribute"`);
        await queryRunner.query(`ALTER TABLE "Role" ADD CONSTRAINT "FK_9f4b09fc05dee164fcce24c67cd" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD CONSTRAINT "FK_b64a8623b75d07abb01ed86b286" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD CONSTRAINT "FK_4f541cc859639c4520582225837" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
