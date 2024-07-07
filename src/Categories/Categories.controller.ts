import { Controller, Post, Get, Body, UseGuards } from "@nestjs/common";
import {CategoriesService} from './Categories.service'
import { Categories } from "./Categories.entity";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/Auth/AuthGuard/AuthGuard.guard";
import { Roles, UserRole } from "src/Decoradores/Roles.Decorator";
import { RolesGuard } from "src/Auth/AuthGuard/RolesGuard.guard";
import { createCategorieDTO } from "./DTO/createCategorie.DTO";

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController{
    constructor(private readonly categoriesService: CategoriesService){}

    @Post('seeder')
    @ApiBearerAuth()
    @ApiOperation({summary:'Hace una carga de categorias para iniciar la pagina con datos'})
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    async preCategory(): Promise<void>{
        return await this.categoriesService.preCategory()
    }

    @Get()
    @ApiOperation({summary:'Trae el listado de categorias existentes'})
    async getCategories():Promise<Categories[]>{
        return await this.categoriesService.getCategories()
    }

    @Post()
    @ApiBearerAuth()
    @ApiOperation({summary:'Crea una nueva categoria'})
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard,RolesGuard)
    async postCategories(@Body() category:createCategorieDTO):Promise<string>{
        return await this.categoriesService.postCategories(category)
    }
}