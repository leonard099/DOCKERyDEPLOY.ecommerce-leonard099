import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn, JoinTable, JoinColumn } from "typeorm";
import { Orders } from "../Ordes/Orders.entity"
import {Products} from "../Products/Products.entity"
import { v4 as uuid} from 'uuid'
@Entity({
    name: 'order_details_ecommerce'
})
export class OrderDetails {

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price:number

    @OneToOne(()=>Orders, order => order.details, { onDelete: 'CASCADE' })
    @JoinColumn()
    order: Orders;

    @ManyToMany(() => Products, products => products.orderDetails, {cascade: true, onDelete: 'CASCADE' })
    products: Products[];
}