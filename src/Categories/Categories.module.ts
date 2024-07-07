import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categories } from "./Categories.entity";
import { CategoriesController } from "./Categories.controller";
import { CategoriesService } from "./Categories.service";
import { CategoriesRepository } from "./Categories.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Categories])],
    controllers: [CategoriesController],
    providers: [CategoriesService, CategoriesRepository]
})
export class CategoriesModule {}