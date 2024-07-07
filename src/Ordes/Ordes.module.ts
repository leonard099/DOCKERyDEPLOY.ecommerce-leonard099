import { Module } from "@nestjs/common";
import {OrdersController} from './Orders.controller'
import { Orders } from "./Orders.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import {OrdersRepository} from './Orders.Repository';
import {OrdersService} from './Orders.Service';
import {Users} from '../Users/User.entity'
import {Products} from '../Products/Products.entity';
import {OrderDetails} from '../OrdersDetails/OrdersDetails.entity'
@Module({
    imports: [TypeOrmModule.forFeature([Orders, Users,Products,OrderDetails])],
    controllers: [OrdersController],
    providers: [OrdersService,OrdersRepository]
})
export class OrdersModule{}