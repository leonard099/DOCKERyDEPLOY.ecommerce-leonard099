import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn,CreateDateColumn } from "typeorm";
import { Users } from "../Users/User.entity";
import { OrderDetails } from "../OrdersDetails/OrdersDetails.entity";
import { v4 as uuid} from 'uuid'
@Entity({
    name:'orders_ecommerce'
})
export class Orders{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @CreateDateColumn()
    date:Date

    @ManyToOne(() => Users, user => user.orders,{ onDelete: 'CASCADE' })
    @JoinColumn({name:'users_id'})
    user: Users;

    @OneToOne(()=>OrderDetails, orderDetails => orderDetails.order, {cascade:true,onDelete:'CASCADE'})
    @JoinColumn()
    details: OrderDetails;
}