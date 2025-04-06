import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1743969916117 implements MigrationInterface {
    name = 'Init1743969916117'

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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "pokemon"
        `);
    }

}
