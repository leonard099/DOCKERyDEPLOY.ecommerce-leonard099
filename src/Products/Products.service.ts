import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./Products.repository";
import { Products } from "./Products.entity";
import { CreateProductDto, ModificarProductDto } from "./ProductsDTO/ProductsDTO";
@Injectable()
export class ProductService {
    constructor(private productsRepository: ProductsRepository) {}

    async preCarga():Promise<void>{
        return await this.productsRepository.preCarga()
    }

    async getProducts(page,limit):Promise<Products[]>{
        return await this.productsRepository.getProducts(page,limit); 
    }

    async getProduct(id:string):Promise<Products>{
        return await this.productsRepository.getProduct(id);
    }

    async addProduct(product:CreateProductDto): Promise<Products> {
        return await this.productsRepository.addProduct(product);
    }

    async updateProduct(id:string, product: ModificarProductDto): Promise<Products> {
        return await this.productsRepository.updateProduct(id,product);
    }

    async deleteProduct(id:string):Promise<string>{
        return await this.productsRepository.deleteProduct(id);
    }
}