import { Products } from "../Products/Products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid} from 'uuid'
@Entity({
    name: 'categories_ecommerce'
})
export class Categories{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({type:'varchar',length:50, nullable:false})
    name:string

    @OneToMany(()=>Products, products => products.categories)
    products: Products[]
}