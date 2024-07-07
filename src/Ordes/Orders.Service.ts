import { Injectable } from "@nestjs/common";
import {OrdersRepository} from './Orders.Repository';
import {CreateOrderDto} from './CarritoDto'
import { Orders } from "./Orders.entity";
import { UUID } from "crypto";

@Injectable()
export class OrdersService{
    constructor(private readonly ordersRepository:OrdersRepository){}

    async addOrder(order:CreateOrderDto):Promise<Orders>{
        return await this.ordersRepository.addOrder(order)
    }
    async getOrder(id:string,req):Promise<Orders>{
        return await this.ordersRepository.getOrder(id,req)
    }
}