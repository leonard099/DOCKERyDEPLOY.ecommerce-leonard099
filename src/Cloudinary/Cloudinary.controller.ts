import { Controller, Post, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Param, ParseUUIDPipe, UseGuards } from "@nestjs/common";
import { CloudinaryService } from "./Cloudinary.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "../Auth/AuthGuard/AuthGuard.guard";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles, UserRole } from "src/Decoradores/Roles.Decorator";
import { RolesGuard } from "src/Auth/AuthGuard/RolesGuard.guard";

@ApiTags('Files')
@Controller('files')
export class CloudinaryController {
    constructor(private readonly cloudinarySevice:CloudinaryService) {}

    @Post('uploadImage/:id')
    @ApiOperation({summary:'Carga una imagen a un producto'})
    @ApiBearerAuth()
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor("file"))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Archivo de imagen',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async uploadImage(@Param('id',ParseUUIDPipe) id:string,@UploadedFile(new ParseFilePipe({
        validators:[
            new MaxFileSizeValidator({
                maxSize:204800,
                message: 'El archivo de imagen es demasiado grande'
            }),
            new FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp)$/,
            }),
        ]})) file: Express.Multer.File): Promise<string> {
        return await this.cloudinarySevice.uploadImage(id,file);
    }
}