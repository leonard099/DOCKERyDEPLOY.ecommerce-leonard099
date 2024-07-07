import {  Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "./Categories.entity";
import { Repository } from "typeorm";
import { copyFileSync } from "fs";
import { Console } from "console";
@Injectable()
export class CategoriesRepository {
    constructor(@InjectRepository(Categories) private categoriesRepository: Repository<Categories>){}

    async preCategory():Promise<void>{
        const preCargaCategories = [
            {name: 'Electrónica'},
            {name: 'Ropa y Accesorios'},
            {name: 'Hogar y Cocinan'},
            {name: 'Libros'},
            {name: 'Deportes'},
            {name: 'Juguetes y Juegos'},
            {name: 'Salud y Belleza'},
            {name: 'Automóviles y Motos'},
            {name: 'Mascotas'},
            {name: 'Alimentos y Bebidas'},
            {name: 'Herramientas'},
            {name: 'Jardín y Exterior'},
            {name: 'Electrodomésticos'},
            {name: 'Bebés y Niños'},
            {name: 'Muebles'},
            {name: 'Arte y Manualidades'},
            {name: 'Instrumentos Musicales'},
            {name: 'Películas y Series'},
            {name: 'Computadoras y Accesorios'},
            {name: 'Celulares y Accesorios'},
            {name: 'Viajes'}
        ]
        try {
            for (const categories of preCargaCategories) {
                const categoria = await this.categoriesRepository.findOne({ where: { name:  categories.name } })
                if (!categoria) {
                    await this.categoriesRepository.save(categories)
                }
            }            
        } catch (error) {
            throw new Error(`Failed to preload categories: ${error.message}`)
        }
    }

    async getCategories():Promise<Categories[]>{
        return this.categoriesRepository.find()
    }

    async postCategories(category):Promise<string>{
        const categoria = await this.categoriesRepository.findOne({where:{name: category.name}})
        if(!categoria){
            try {
                await this.categoriesRepository.save(category)
                return 'Categoria creada correctamente'
            } catch (error) {
                throw new Error ('No se pudo crear la categoria')
            }
        }else {
            return 'Categoria existente'
        }
    }
}