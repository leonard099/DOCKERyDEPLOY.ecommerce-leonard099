import { Module } from "@nestjs/common";
import { ProductController } from "./Products.controller";
import { ProductService } from "./Products.service";
import { ProductsRepository } from "./Products.repository";
import {UsersRepository} from '../Users/Users.repository'
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "./Products.entity";
import { Categories } from "../Categories/Categories.entity";
import { Users } from "../Users/User.entity";
@Module({
    imports: [TypeOrmModule.forFeature([Products,Categories, Users])],
    controllers: [ProductController],
    providers: [ProductService, ProductsRepository, UsersRepository],
})
export class ProductModule{}

