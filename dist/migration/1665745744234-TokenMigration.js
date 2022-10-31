"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMigration1665745744234 = void 0;
class TokenMigration1665745744234 {
    constructor() {
        this.name = 'TokenMigration1665745744234';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Agent" DROP CONSTRAINT "FK_4f541cc859639c4520582225837"`);
        await queryRunner.query(`CREATE TYPE "public"."token_type_enum" AS ENUM('refresh_token', 'verify_email')`);
        await queryRunner.query(`CREATE TABLE "token" ("id" SERIAL NOT NULL, "type" "public"."token_type_enum" NOT NULL, "expires_in" TIMESTAMP NOT NULL, "agent_id" integer NOT NULL, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
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
        await queryRunner.query(`ALTER TABLE "Agent" ADD "tenant_id" character varying`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_ef35e49f4d4b5d496bb4a039088" FOREIGN KEY ("agent_id") REFERENCES "Agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD CONSTRAINT "FK_4f541cc859639c4520582225837" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Agent" DROP CONSTRAINT "FK_4f541cc859639c4520582225837"`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_ef35e49f4d4b5d496bb4a039088"`);
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
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TYPE "public"."token_type_enum"`);
        await queryRunner.query(`ALTER TABLE "Agent" ADD CONSTRAINT "FK_4f541cc859639c4520582225837" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.TokenMigration1665745744234 = TokenMigration1665745744234;
//# sourceMappingURL=1665745744234-TokenMigration.js.map