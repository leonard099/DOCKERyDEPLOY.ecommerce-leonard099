import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn} from "typeorm";
import { Orders } from "../Ordes/Orders.entity";
import { v4 as uuid} from 'uuid'
import { UserRole } from "../Decoradores/Roles.Decorator";
@Entity({
    name:'users_ecommerce'
})
export class Users {
    
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({type:"varchar",length:50, nullable:false})
    name:string

    @Column({type:"varchar", length:50, nullable:false, unique: true})
    email:string
    
    @Column({type:"varchar",length:100, nullable:false})
    password:string

    @Column({ type:'bigint' })
    phone:number

    @Column({type:"varchar", length:50})
    country:string

    @Column({type:"varchar"})
    address:string

    @Column({type:"varchar",length:50})
    city:string
    
    @Column({default:UserRole.USER})
    isAdmin:UserRole

    @OneToMany(() => Orders, order => order.user, {cascade:true,onDelete:'CASCADE'})
    @JoinColumn({name:'ordes_id'})
    orders: Orders[];
}