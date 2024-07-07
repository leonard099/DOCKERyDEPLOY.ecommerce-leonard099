import { Body, Controller, Param, Post, UseGuards, Get, ParseUUIDPipe, Req} from "@nestjs/common";
import {OrdersService} from './Orders.Service'
import {CreateOrderDto} from './CarritoDto'
import { Orders } from "./Orders.entity";
import { AuthGuard } from "../Auth/AuthGuard/AuthGuard.guard";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles, UserRole } from "src/Decoradores/Roles.Decorator";
import { RolesGuard } from "src/Auth/AuthGuard/RolesGuard.guard";

@ApiTags('Orders')
@Controller('orders')
export class OrdersController{
    constructor(private readonly orderService:OrdersService){}

    @Post()
    @ApiOperation({summary:'Crear una nuena orden de compra'})
    @ApiBearerAuth()
    @Roles(UserRole.ADMIN,UserRole.USER)
    @UseGuards(AuthGuard, RolesGuard)
    async addOrder(@Body() order:CreateOrderDto):Promise<Orders>{
        return await this.orderService.addOrder(order)
    }

    //Deberia checkear que la orden le correspona al usarioque hace la solicitud
    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({summary:'Trae los detalles de una orden por ID'})
    @Roles(UserRole.ADMIN,UserRole.USER)
    @UseGuards(AuthGuard, RolesGuard)
    async getOrder(@Req()req,@Param('id', ParseUUIDPipe) id:string):Promise<Orders>{
        return await this.orderService.getOrder(id,req)
    }
}