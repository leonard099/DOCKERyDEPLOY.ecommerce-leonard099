import { MigrationInterface, QueryRunner } from "typeorm";

export class Cascade1719406483717 implements MigrationInterface {
    name = 'Cascade1719406483717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories_ecommerce" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_48dadf824e117e14ed7378be498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_ecommerce" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying NOT NULL DEFAULT 'https://png.pngtree.com/png-clipart/20190630/original/pngtree-img-file-document-icon-png-image_4166554.jpg', "categoriesId" uuid, CONSTRAINT "UQ_2afe965bb5fa260a55c413ac8ca" UNIQUE ("name"), CONSTRAINT "PK_a9d2283092739d91dfb5b0b59f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_details_ecommerce" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "orderId" uuid, CONSTRAINT "REL_3b18199e6da0c29661602bc23e" UNIQUE ("orderId"), CONSTRAINT "PK_137a7c20809946361323b1d3a8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_ecommerce" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT now(), "users_id" uuid, "detailsId" uuid, CONSTRAINT "REL_c95850b14e9e557a8e2e6f3743" UNIQUE ("detailsId"), CONSTRAINT "PK_68a6c1a337e2bad50098863702c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_ecommerce" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(20) NOT NULL, "phone" bigint NOT NULL, "country" character varying(50) NOT NULL, "address" character varying NOT NULL, "city" character varying(50) NOT NULL, CONSTRAINT "UQ_5894f0363fd96fb02b9a27b373e" UNIQUE ("email"), CONSTRAINT "PK_09dec5c832164fb267a321dfcc4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_ecommerce_order_details_order_details_ecommerce" ("productsEcommerceId" uuid NOT NULL, "orderDetailsEcommerceId" uuid NOT NULL, CONSTRAINT "PK_f83d430dd97591fc02b451da381" PRIMARY KEY ("productsEcommerceId", "orderDetailsEcommerceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f48e9a2950641c59654c3bbc4a" ON "products_ecommerce_order_details_order_details_ecommerce" ("productsEcommerceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2c447d9251833b38957f3957fd" ON "products_ecommerce_order_details_order_details_ecommerce" ("orderDetailsEcommerceId") `);
        await queryRunner.query(`ALTER TABLE "products_ecommerce" ADD CONSTRAINT "FK_7a99eae6e889c47a69dbca35029" FOREIGN KEY ("categoriesId") REFERENCES "categories_ecommerce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_details_ecommerce" ADD CONSTRAINT "FK_3b18199e6da0c29661602bc23ee" FOREIGN KEY ("orderId") REFERENCES "orders_ecommerce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_ecommerce" ADD CONSTRAINT "FK_8bbf2af9ad7ddd6108a4f4c9979" FOREIGN KEY ("users_id") REFERENCES "users_ecommerce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_ecommerce" ADD CONSTRAINT "FK_c95850b14e9e557a8e2e6f3743f" FOREIGN KEY ("detailsId") REFERENCES "order_details_ecommerce"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_ecommerce_order_details_order_details_ecommerce" ADD CONSTRAINT "FK_f48e9a2950641c59654c3bbc4a4" FOREIGN KEY ("productsEcommerceId") REFERENCES "products_ecommerce"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_ecommerce_order_details_order_details_ecommerce" ADD CONSTRAINT "FK_2c447d9251833b38957f3957fd8" FOREIGN KEY ("orderDetailsEcommerceId") REFERENCES "order_details_ecommerce"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_ecommerce_order_details_order_details_ecommerce" DROP CONSTRAINT "FK_2c447d9251833b38957f3957fd8"`);
        await queryRunner.query(`ALTER TABLE "products_ecommerce_order_details_order_details_ecommerce" DROP CONSTRAINT "FK_f48e9a2950641c59654c3bbc4a4"`);
        await queryRunner.query(`ALTER TABLE "orders_ecommerce" DROP CONSTRAINT "FK_c95850b14e9e557a8e2e6f3743f"`);
        await queryRunner.query(`ALTER TABLE "orders_ecommerce" DROP CONSTRAINT "FK_8bbf2af9ad7ddd6108a4f4c9979"`);
        await queryRunner.query(`ALTER TABLE "order_details_ecommerce" DROP CONSTRAINT "FK_3b18199e6da0c29661602bc23ee"`);
        await queryRunner.query(`ALTER TABLE "products_ecommerce" DROP CONSTRAINT "FK_7a99eae6e889c47a69dbca35029"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2c447d9251833b38957f3957fd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f48e9a2950641c59654c3bbc4a"`);
        await queryRunner.query(`DROP TABLE "products_ecommerce_order_details_order_details_ecommerce"`);
        await queryRunner.query(`DROP TABLE "users_ecommerce"`);
        await queryRunner.query(`DROP TABLE "orders_ecommerce"`);
        await queryRunner.query(`DROP TABLE "order_details_ecommerce"`);
        await queryRunner.query(`DROP TABLE "products_ecommerce"`);
        await queryRunner.query(`DROP TABLE "categories_ecommerce"`);
    }

}
