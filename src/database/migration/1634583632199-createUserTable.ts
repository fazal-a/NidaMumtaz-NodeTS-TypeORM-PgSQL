import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1634583632199 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "UsersTable" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR NOT NULL,
                "email" VARCHAR UNIQUE NOT NULL,
                "password" VARCHAR NOT NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "UsersTable"`);
    }
}

module.exports = CreateUserTable1634583632199;
