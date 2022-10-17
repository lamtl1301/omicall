import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProject1666038325009 implements MigrationInterface {
    name = 'AddProject1666038325009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Agent" DROP CONSTRAINT "FK_4f541cc859639c4520582225837"`);
        await queryRunner.query(`ALTER TABLE "Role" RENAME COLUMN "isDeleted" TO "is_deleted"`);
        await queryRunner.query(`CREATE TABLE "phone_number" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP, "updatedAt" TIMESTAMP, "number" character varying NOT NULL, "provider" character varying, "provider_type" character varying, "number_type" character varying, "nation" character varying, CONSTRAINT "PK_c16f58426537a660b3f2a26e983" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer_number" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP, "updatedAt" TIMESTAMP, "phone_number_id" integer NOT NULL, "customer_id" integer NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "phoneNumberId" integer, CONSTRAINT "PK_56dc666dd6d4392b2cfdb2e4016" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP, "updatedAt" TIMESTAMP, "full_name" character varying NOT NULL, "project_id" integer NOT NULL, "email" character varying, "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP, "updatedAt" TIMESTAMP, "project_name" character varying NOT NULL, "domain" character varying NOT NULL, "description" character varying NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "is_enabled" boolean NOT NULL DEFAULT true, "tenant_id" integer NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
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
        await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "package_exp"`);
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
        await queryRunner.query(`ALTER TABLE "package" ADD "package_expire" integer`);
        await queryRunner.query(`ALTER TABLE "package" ADD "expire_unit" character varying`);
        await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "package" ADD "price" double precision`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD CONSTRAINT "FK_4f541cc859639c4520582225837" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD CONSTRAINT "FK_b64a8623b75d07abb01ed86b286" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_number" ADD CONSTRAINT "FK_035c9963ff914dd5b57fbf9bf5c" FOREIGN KEY ("phoneNumberId") REFERENCES "phone_number"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_number" ADD CONSTRAINT "FK_7e90b4f360a0562340c7662fac2" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_9b8dee5768633ef5de25abcecd6" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_7f7b75f9324d8855b824d6d22a4" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_7f7b75f9324d8855b824d6d22a4"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_9b8dee5768633ef5de25abcecd6"`);
        await queryRunner.query(`ALTER TABLE "customer_number" DROP CONSTRAINT "FK_7e90b4f360a0562340c7662fac2"`);
        await queryRunner.query(`ALTER TABLE "customer_number" DROP CONSTRAINT "FK_035c9963ff914dd5b57fbf9bf5c"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP CONSTRAINT "FK_b64a8623b75d07abb01ed86b286"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP CONSTRAINT "FK_4f541cc859639c4520582225837"`);
        await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "package" ADD "price" character varying`);
        await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "expire_unit"`);
        await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "package_expire"`);
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
        await queryRunner.query(`ALTER TABLE "package" ADD "package_exp" integer`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "tenant_id" character varying`);
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
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "customer_number"`);
        await queryRunner.query(`DROP TABLE "phone_number"`);
        await queryRunner.query(`ALTER TABLE "Role" RENAME COLUMN "is_deleted" TO "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD CONSTRAINT "FK_4f541cc859639c4520582225837" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
