import { Controller, Get, Param, Post, Body, UseGuards, Put, Delete, Query, ParseUUIDPipe } from "@nestjs/common";
import {ProductService} from './Products.service'
import { Products } from "./Products.entity";
import { AuthGuard } from "../Auth/AuthGuard/AuthGuard.guard";
import { RolesGuard } from "../Auth/AuthGuard/RolesGuard.guard";
import { CreateProductDto, ModificarProductDto } from "./ProductsDTO/ProductsDTO";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Roles, UserRole } from "src/Decoradores/Roles.Decorator";

@ApiTags('Products')
@Controller('products')
export class ProductController {
    constructor(private readonly productService:ProductService){};
    @Post('seeder')
    @ApiBearerAuth()
    @ApiOperation({summary:'Hace una carga de productos para iniciar la aplicacion con datos'})
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    async preCarga():Promise<void>{
        return this.productService.preCarga()
    }
    @Get()
    @ApiOperation({summary:'Trae un listado de productos paginado'})
    @ApiQuery({ name: 'page', type: Number, description: 'Numero de paginas' })
    @ApiQuery({ name: 'limit', type: Number, description: 'Cantidad de productos a mostrar'})
    async getProducts(@Query('page') page = 1, @Query('limit') limit = 10):Promise<Products[]>{
        return this.productService.getProducts(page,limit)
    }
    
    @Get(':id')
    @ApiOperation({summary:'Trae un unico producto por su ID'})
    async getProduct(@Param('id', ParseUUIDPipe) id:string):Promise<Products>{
        return await this.productService.getProduct(id)
    }
    
    @Post()
    @ApiBearerAuth()
    @ApiOperation({summary:'Creacion de un nuevo producto'})
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    async addProduct(@Body() product:CreateProductDto): Promise<Products> {
        return  await this.productService.addProduct(product);
    }

    @Put(':id')
    @ApiBearerAuth()
    @ApiOperation({summary:'Modificacion de un producto'})
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard,RolesGuard)
    async updateProduct(@Param('id', ParseUUIDPipe) id:string, @Body() product:ModificarProductDto): Promise<Products> {
        return await this.productService.updateProduct(id,product);
    }
    
    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({summary:'Elimina un producto'})
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    async deleteProduct(@Param('id', ParseUUIDPipe) id:string):Promise<string>{
        return this.productService.deleteProduct(id)
    }

}