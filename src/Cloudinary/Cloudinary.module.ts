import { Module } from "@nestjs/common";
import { CloudinaryController } from "./Cloudinary.controller";
import { CloudinaryRepository } from "./Cloudinary.repository";
import { CloudinaryService } from "./Cloudinary.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "../Products/Products.entity";
import { ClaudinaryConfig } from "../Config/cloudinay";

@Module({
    imports:[TypeOrmModule.forFeature([Products])],
    controllers:[CloudinaryController],
    providers:[CloudinaryRepository, CloudinaryService, ClaudinaryConfig]
})
export class CloudinaryModule {}