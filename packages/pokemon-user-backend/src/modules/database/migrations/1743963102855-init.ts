import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1743963102855 implements MigrationInterface {
    name = 'Init1743963102855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "pokemon" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "pokedexNumber" integer NOT NULL,
                "imageUrl" character varying,
                "hp" integer NOT NULL,
                "attack" integer NOT NULL,
                "defense" integer NOT NULL,
                "specialAttack" integer NOT NULL,
                "specialDefense" integer NOT NULL,
                "speed" integer NOT NULL,
                "types" text array NOT NULL,
                "height" integer NOT NULL,
                "weight" integer NOT NULL,
                CONSTRAINT "PK_0b503db1369f46c43f8da0a6a0a" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "profile" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "profile_pokemon" (
                "profile_id" integer NOT NULL,
                "pokemon_id" integer NOT NULL,
                CONSTRAINT "PK_0dca8d6b39602a29d12e30cad30" PRIMARY KEY ("profile_id", "pokemon_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ce20c2dd04c66360cd65935a62" ON "profile_pokemon" ("profile_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a4bb34a5a1cb0a642caa118afa" ON "profile_pokemon" ("pokemon_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "profile_pokemon"
            ADD CONSTRAINT "FK_ce20c2dd04c66360cd65935a62a" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "profile_pokemon"
            ADD CONSTRAINT "FK_a4bb34a5a1cb0a642caa118afac" FOREIGN KEY ("pokemon_id") REFERENCES "pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profile_pokemon" DROP CONSTRAINT "FK_a4bb34a5a1cb0a642caa118afac"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile_pokemon" DROP CONSTRAINT "FK_ce20c2dd04c66360cd65935a62a"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_a4bb34a5a1cb0a642caa118afa"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_ce20c2dd04c66360cd65935a62"
        `);
        await queryRunner.query(`
            DROP TABLE "profile_pokemon"
        `);
        await queryRunner.query(`
            DROP TABLE "profile"
        `);
        await queryRunner.query(`
            DROP TABLE "pokemon"
        `);
    }

}
