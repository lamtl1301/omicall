import { MigrationInterface, QueryRunner } from "typeorm";

export class NewDatabase1667285604848 implements MigrationInterface {
    name = 'NewDatabase1667285604848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Agent" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP, "updatedAt" TIMESTAMP, CONSTRAINT "PK_d3e275b7b201e40ca8f8108aa0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "base_attribute" ("id" SERIAL NOT NULL, "attribute_id" integer NOT NULL, "value" character varying NOT NULL, "is_deleted" boolean NOT NULL, CONSTRAINT "PK_114f0281d198021452d8007ea9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agent_role" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP, "updatedAt" TIMESTAMP, "agent_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_306c47e4a4c59701a7308ba7c73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Role" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP, "updatedAt" TIMESTAMP, "name" character varying NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "is_owner" boolean NOT NULL DEFAULT false, "status" boolean NOT NULL, "project_id" integer NOT NULL, "permission" integer NOT NULL, "role_level" integer NOT NULL, CONSTRAINT "PK_9309532197a7397548e341e5536" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "phone_number" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP, "updatedAt" TIMESTAMP, "number" character varying NOT NULL, "provider" character varying, "provider_type" character varying, "number_type" character varying, "nation" character varying, CONSTRAINT "PK_c16f58426537a660b3f2a26e983" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer_number" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP, "updatedAt" TIMESTAMP, "phone_number_id" integer NOT NULL, "customer_id" integer NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "phoneNumberId" integer, CONSTRAINT "PK_56dc666dd6d4392b2cfdb2e4016" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP, "updatedAt" TIMESTAMP, "full_name" character varying NOT NULL, "project_id" integer NOT NULL, "email" character varying, "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tenant" ("id" character varying NOT NULL, "full_name" character varying NOT NULL, "description" character varying NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "is_deleted" boolean NOT NULL DEFAULT false, "is_Vihat" boolean NOT NULL DEFAULT false, "nation" character varying NOT NULL, "language" character varying NOT NULL, "create_at" TIMESTAMP, "update_at" TIMESTAMP, CONSTRAINT "PK_da8c6efd67bb301e810e56ac139" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP, "updatedAt" TIMESTAMP, "project_name" character varying NOT NULL, "pbx_domain" character varying NOT NULL, "description" character varying NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "is_enabled" boolean NOT NULL DEFAULT true, "tenant_id" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_attribute" ("id" SERIAL NOT NULL, "attribute_id" integer NOT NULL, "value" character varying NOT NULL, "is_deleted" boolean NOT NULL, "project_id" integer NOT NULL, "display_index" integer NOT NULL, CONSTRAINT "PK_0924c09018ae3de597476ff3189" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attribute" ("id" SERIAL NOT NULL, "attribute_name" character varying NOT NULL, CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agent_attribute" ("id" SERIAL NOT NULL, "attribute_id" integer NOT NULL, "value" character varying NOT NULL, "is_deleted" boolean NOT NULL, "agent_id" integer NOT NULL, "display_index" integer NOT NULL, CONSTRAINT "PK_7ceef58250fe9bc7e8bd53fb21a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."token_type_enum" AS ENUM('refresh_token', 'verify_email')`);
        await queryRunner.query(`CREATE TABLE "token" ("id" character varying NOT NULL, "type" "public"."token_type_enum" NOT NULL, "expires_in" TIMESTAMP NOT NULL, "agent_id" integer NOT NULL, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "package" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP, "updatedAt" TIMESTAMP, "service_name" character varying NOT NULL, "description" character varying, "price" double precision, "customer_num" integer, "staff_num" integer, "package_expire" integer, "expire_unit" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "is_enabled" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_308364c66df656295bc4ec467c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file_record" ("id" SERIAL NOT NULL, "file_name" character varying NOT NULL, "file_type_id" integer NOT NULL, "record_seconds" integer NOT NULL, "is_deleted" boolean NOT NULL DEFAULT 'false', "historyCallId" integer, CONSTRAINT "PK_16ca009355a1f732909b3ff477b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "history_call" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP, "updatedAt" TIMESTAMP, "agent_id" integer NOT NULL, "file_id" integer NOT NULL, "project_number_id" integer NOT NULL, "customer_number_id" integer NOT NULL, "time_start_to_answer" integer NOT NULL, "duration" integer NOT NULL, "disposition" character varying NOT NULL, CONSTRAINT "PK_627fdb965425119bd536713ef5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "full_name" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "is_first_login" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "is_actived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "is_owner" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "gender" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "tag_id" integer`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "tenant_id" character varying`);
        await queryRunner.query(`ALTER TABLE "agent_role" ADD CONSTRAINT "FK_2dd7af009bca884cb059c5a2b56" FOREIGN KEY ("agent_id") REFERENCES "Agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent_role" ADD CONSTRAINT "FK_9bd4579902984188e7523bb6f6a" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Role" ADD CONSTRAINT "FK_b80b1573a6a91b4aaf650150c2f" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_number" ADD CONSTRAINT "FK_035c9963ff914dd5b57fbf9bf5c" FOREIGN KEY ("phoneNumberId") REFERENCES "phone_number"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_number" ADD CONSTRAINT "FK_7e90b4f360a0562340c7662fac2" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_9b8dee5768633ef5de25abcecd6" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_7f7b75f9324d8855b824d6d22a4" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_attribute" ADD CONSTRAINT "FK_568b72936e4c061fe4478acbfcd" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_attribute" ADD CONSTRAINT "FK_d813fc46853614b568da22db232" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent_attribute" ADD CONSTRAINT "FK_5a348e5945e4b934b8a1556e269" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent_attribute" ADD CONSTRAINT "FK_674f0b57afed3a1dd5a9a0f0051" FOREIGN KEY ("agent_id") REFERENCES "Agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_ef35e49f4d4b5d496bb4a039088" FOREIGN KEY ("agent_id") REFERENCES "Agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD CONSTRAINT "FK_b64a8623b75d07abb01ed86b286" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file_record" ADD CONSTRAINT "FK_62e36369c37a2c4c80b9fbdfcc0" FOREIGN KEY ("historyCallId") REFERENCES "history_call"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file_record" DROP CONSTRAINT "FK_62e36369c37a2c4c80b9fbdfcc0"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP CONSTRAINT "FK_b64a8623b75d07abb01ed86b286"`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_ef35e49f4d4b5d496bb4a039088"`);
        await queryRunner.query(`ALTER TABLE "agent_attribute" DROP CONSTRAINT "FK_674f0b57afed3a1dd5a9a0f0051"`);
        await queryRunner.query(`ALTER TABLE "agent_attribute" DROP CONSTRAINT "FK_5a348e5945e4b934b8a1556e269"`);
        await queryRunner.query(`ALTER TABLE "project_attribute" DROP CONSTRAINT "FK_d813fc46853614b568da22db232"`);
        await queryRunner.query(`ALTER TABLE "project_attribute" DROP CONSTRAINT "FK_568b72936e4c061fe4478acbfcd"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_7f7b75f9324d8855b824d6d22a4"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_9b8dee5768633ef5de25abcecd6"`);
        await queryRunner.query(`ALTER TABLE "customer_number" DROP CONSTRAINT "FK_7e90b4f360a0562340c7662fac2"`);
        await queryRunner.query(`ALTER TABLE "customer_number" DROP CONSTRAINT "FK_035c9963ff914dd5b57fbf9bf5c"`);
        await queryRunner.query(`ALTER TABLE "Role" DROP CONSTRAINT "FK_b80b1573a6a91b4aaf650150c2f"`);
        await queryRunner.query(`ALTER TABLE "agent_role" DROP CONSTRAINT "FK_9bd4579902984188e7523bb6f6a"`);
        await queryRunner.query(`ALTER TABLE "agent_role" DROP CONSTRAINT "FK_2dd7af009bca884cb059c5a2b56"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "tenant_id"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "tag_id"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "is_owner"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "is_actived"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "is_first_login"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "password"`);
        await queryRunner.query(`DROP TABLE "history_call"`);
        await queryRunner.query(`DROP TABLE "file_record"`);
        await queryRunner.query(`DROP TABLE "package"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TYPE "public"."token_type_enum"`);
        await queryRunner.query(`DROP TABLE "agent_attribute"`);
        await queryRunner.query(`DROP TABLE "attribute"`);
        await queryRunner.query(`DROP TABLE "project_attribute"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "tenant"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "customer_number"`);
        await queryRunner.query(`DROP TABLE "phone_number"`);
        await queryRunner.query(`DROP TABLE "Role"`);
        await queryRunner.query(`DROP TABLE "agent_role"`);
        await queryRunner.query(`DROP TABLE "base_attribute"`);
        await queryRunner.query(`DROP TABLE "Agent"`);
    }

}
