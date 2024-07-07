import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CloudinaryRepository } from "./Cloudinary.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "../Products/Products.entity";
import { Repository } from "typeorm";

@Injectable()
export class CloudinaryService {
    constructor(private readonly cloudinaryRepository: CloudinaryRepository,@InjectRepository(Products) private productsRepository:Repository<Products>) {}

    async uploadImage(id:string,file: Express.Multer.File):Promise<string>{
        const product = await this.productsRepository.findOne({where:{id}})

        if (product) {
            const uploadImagen = await this.cloudinaryRepository.uploadImage(file)
            const urlCloudinaryFile = uploadImagen.url
            if(!urlCloudinaryFile){
                throw new BadRequestException('No se logro cargar la imagen correctamente')
            }else {
                try {
                    product.imgUrl = urlCloudinaryFile
                    await this.productsRepository.save(product)
                    return 'La imagen fue cargada correcamente'
                } catch (error) {
                    throw new BadRequestException('No se logro cargar la imagen correctamente')
                }
            }
        } else {
            throw new NotFoundException('Producto no existe')
        }

         
    }
}