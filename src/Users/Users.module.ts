import { Module } from "@nestjs/common";
import { UsersController } from "./Users.controllers";
import { UserService } from "./Users.service";
import {UsersRepository} from './Users.repository'
import {validarPOSTUser} from './Guard/validarPOSTUser'
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./User.entity";
@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [UsersController],
    providers: [UserService, UsersRepository, validarPOSTUser]
})
export class UsersModule{}