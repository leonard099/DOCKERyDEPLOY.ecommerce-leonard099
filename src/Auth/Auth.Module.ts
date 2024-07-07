import { Module } from "@nestjs/common";
import {AuthController} from "./Auth.Controller";
import {AuthService} from "./Auth.Service";
import { UsersRepository } from "../Users/Users.repository";
import {AuthRepository} from './Auth.Repository'
import { TypeOrmModule } from "@nestjs/typeorm";
import {Users} from '../Users/User.entity'
import { AuthGuard } from "./AuthGuard/AuthGuard.guard";
import { UserService } from "../Users/Users.service";
import { RolesGuard } from "./AuthGuard/RolesGuard.guard";
@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [AuthController],
    providers: [AuthService,UsersRepository,AuthRepository,UserService,AuthGuard,RolesGuard]
})
export class AuthModule {}