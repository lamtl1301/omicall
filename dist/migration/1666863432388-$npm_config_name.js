"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$npmConfigName1666863432388 = void 0;
class $npmConfigName1666863432388 {
    constructor() {
        this.name = '$npmConfigName1666863432388';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Agent" DROP CONSTRAINT "FK_b64a8623b75d07abb01ed86b286"`);
        await queryRunner.query(`CREATE TABLE "history_call" ("id" integer NOT NULL, "agent_id" integer NOT NULL, "file_id" integer NOT NULL, "project_number_id" integer NOT NULL, "customer_number_id" integer NOT NULL, "time_start_to_answer" integer NOT NULL, "duration" integer NOT NULL, "disposition" integer NOT NULL, CONSTRAINT "PK_627fdb965425119bd536713ef5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file_record" ("id" SERIAL NOT NULL, "file_name" character varying NOT NULL, "file_type_id" integer NOT NULL, "record_seconds" integer NOT NULL, "is_deleted" boolean NOT NULL DEFAULT 'false', "historyCallId" integer, CONSTRAINT "PK_16ca009355a1f732909b3ff477b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file_type" ("id" SERIAL NOT NULL, "type_name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_25232e25514cdf0dede64181acc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "is_first_login"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "is_actived"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "tag_id"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "tenant_id"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "tenant" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "tenant" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "tenant" ADD "is_Vihat" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tenant" ADD "create_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "tenant" ADD "update_at" TIMESTAMP`);
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
        await queryRunner.query(`ALTER TABLE "Agent" ADD "tenant_id" integer`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD CONSTRAINT "FK_b64a8623b75d07abb01ed86b286" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file_record" ADD CONSTRAINT "FK_1c8da1dd36a18cfa4ab8b5b6f17" FOREIGN KEY ("file_type_id") REFERENCES "file_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file_record" ADD CONSTRAINT "FK_62e36369c37a2c4c80b9fbdfcc0" FOREIGN KEY ("historyCallId") REFERENCES "history_call"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "file_record" DROP CONSTRAINT "FK_62e36369c37a2c4c80b9fbdfcc0"`);
        await queryRunner.query(`ALTER TABLE "file_record" DROP CONSTRAINT "FK_1c8da1dd36a18cfa4ab8b5b6f17"`);
        await queryRunner.query(`ALTER TABLE "Agent" DROP CONSTRAINT "FK_b64a8623b75d07abb01ed86b286"`);
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
        await queryRunner.query(`ALTER TABLE "tenant" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "tenant" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "tenant" DROP COLUMN "is_Vihat"`);
        await queryRunner.query(`ALTER TABLE "tenant" ADD "updatedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "tenant" ADD "createAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "gender" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "full_name" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "tenant_id" integer`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "tag_id" integer`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "is_actived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "is_first_login" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`DROP TABLE "file_type"`);
        await queryRunner.query(`DROP TABLE "file_record"`);
        await queryRunner.query(`DROP TABLE "history_call"`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD CONSTRAINT "FK_b64a8623b75d07abb01ed86b286" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.$npmConfigName1666863432388 = $npmConfigName1666863432388;
//# sourceMappingURL=1666863432388-$npm_config_name.js.map