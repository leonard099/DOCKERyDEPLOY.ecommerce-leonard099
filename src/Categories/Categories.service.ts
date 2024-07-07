import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./Categories.repository";
import { Categories } from "./Categories.entity";
import { ReturnDocument } from "typeorm";
@Injectable()
export class CategoriesService{
    constructor(private readonly categoriesRepository: CategoriesRepository){}

    async preCategory():Promise<void>{
        return await this.categoriesRepository.preCategory()
    }

    async getCategories():Promise<Categories[]>{
        return await this.categoriesRepository.getCategories()
    }

    async postCategories(category):Promise<string>{
        return await this.categoriesRepository.postCategories(category)
    }
}