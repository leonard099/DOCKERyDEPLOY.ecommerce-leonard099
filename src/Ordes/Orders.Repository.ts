import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "../Products/Products.entity";
import { Users } from "../Users/User.entity";
import { Repository } from "typeorm";
import { Orders } from "./Orders.entity";
import { OrderDetails } from "../OrdersDetails/OrdersDetails.entity";
import {CreateOrderDto} from './CarritoDto'
import { run } from "node:test";
@Injectable()
export class OrdersRepository{
    constructor (
    @InjectRepository(Users) 
    private usersRepository:Repository<Users>,
    @InjectRepository(Products) 
    private productRepository:Repository<Products>, 
    @InjectRepository(Orders) private ordersRepository:Repository<Orders>,
    @InjectRepository(OrderDetails)private orderDetailsRepository:Repository<OrderDetails>){}
    
    async addOrder(order:CreateOrderDto):Promise<Orders>{
        const user = await this.usersRepository.findOne({where:{id:order.userId},select:['id','name','email','address','city','country','orders','phone']})
        if (!user){
            throw new BadRequestException ('Usuario inexistente')
        }
        const nuevaOrden = await this.ordersRepository.create({user})
        await this.ordersRepository.save(nuevaOrden)
        if (!nuevaOrden) {
            throw new BadRequestException ('La orden no se creo')
        }
        const productos:Products[] = []
        let precio:number = 0
        
        for (const producto of order.products) {
            console.log(producto)
            let productoFinal = await this.productRepository.findOne({where:{id:producto.id,estado:true}})
            console.log(productoFinal)
            if (!productoFinal) {
                throw new BadRequestException('Producto no encontrado')
            } else if (productoFinal.stock==0){
                throw new BadRequestException ('No hay stock')
            } else{
                productos.push(productoFinal)
                precio += Number(productoFinal.price)   
                productoFinal.stock-=1
                await this.productRepository.save(productoFinal)
            }
        } 
        

        const orderDetail = await this.orderDetailsRepository.create({
            price:precio,
            order:nuevaOrden,
            products:productos,
        })
        
        await this.orderDetailsRepository.save(orderDetail)
        nuevaOrden.details = orderDetail;
        await this.ordersRepository.save(nuevaOrden)
        return nuevaOrden
    }

    async getOrder(id:string, req):Promise<Orders>{
        const orden = await this.ordersRepository.findOne({where:{id},relations:['user','details','details.products'], select:{user:{id:true,name:true,email:true,phone:true,country:true,address:true,city:true}}})
        const usuario = req.user
        if(usuario.sub==orden.user.id){
            return orden
        }else{
            throw new BadRequestException('No tienes acceso a esta información')
        }
    }
}