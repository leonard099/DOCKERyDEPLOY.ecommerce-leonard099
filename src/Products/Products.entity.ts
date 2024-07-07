import { OrderDetails } from "../OrdersDetails/OrdersDetails.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable, ManyToOne, JoinColumn } from "typeorm";
import {Categories} from '../Categories/Categories.entity'
import { v4 as uuid} from 'uuid'

@Entity({
    name: 'products_ecommerce'
})
export class Products{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({type:"varchar",length:50,nullable:false, unique:true})
    name:string

    @Column({type:"varchar", nullable:false})
    description:string

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price:number

    @Column({nullable:false})
    stock:number

    @Column({default:'https://png.pngtree.com/png-clipart/20190630/original/pngtree-img-file-document-icon-png-image_4166554.jpg'})
    imgUrl:string
    
    @Column({default:true})
    estado: boolean

    @ManyToOne(()=> Categories, categories => categories.products)
    @JoinColumn()
    categories: Categories

    @ManyToMany(() => OrderDetails, orderDetail => orderDetail.products) 
    @JoinTable()
    orderDetails: OrderDetails[]
}