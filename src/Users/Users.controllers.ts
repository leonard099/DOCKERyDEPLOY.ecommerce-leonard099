import { Controller, Get, Param, Body,Put, Delete, UseGuards, Query, ParseUUIDPipe, Req} from "@nestjs/common";
import { UserService } from "./Users.service";
import {Users} from './User.entity'
import {AuthGuard} from '../Auth/AuthGuard/AuthGuard.guard'
import {UsersDTOPut}from './UserDTO/UserDTO'
import { RolesGuard } from "../Auth/AuthGuard/RolesGuard.guard";
import { Roles, UserRole } from "../Decoradores/Roles.Decorator";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService:UserService){};

    @Get()
    @ApiOperation({summary:'Trae un listado de todos los usuarios'})
    @ApiBearerAuth()
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard,RolesGuard)
    async getAllUsers():Promise<Users[]>{
        return await this.userService.getAllUsers();
    }
    
    @Get()
    @ApiOperation({summary:'Trae un listado de usuarios paginado'})
    @ApiBearerAuth()
    @ApiQuery({ name: 'page', type: Number, description: 'Numero de paginas' })
    @ApiQuery({ name: 'limit', type: Number, description: 'Cantidad de usuarios a mostrar'})
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard,RolesGuard)
    async getUsers(@Query('page') page=1, @Query('limit') limit=5):Promise<Users[]>{
        return await this.userService.getAllUsersPage(page,limit);
    }

    @Get(':id')
    @ApiOperation({summary:'Trae los datos de un usuario por su ID'})
    @ApiBearerAuth()
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard,RolesGuard)
    async getUserById(@Param('id', ParseUUIDPipe) id:string):Promise<Users>{
        return this.userService.getUserById(id);
    }
    
    @Put(':id')
    @ApiOperation({summary:'Modifica los datos de un usuario por ID'})
    @ApiBearerAuth()
    @Roles(UserRole.USER)
    @UseGuards(AuthGuard, RolesGuard)
    async updateUser(@Req()req,@Param('id',ParseUUIDPipe) id:string,@Body() user:UsersDTOPut ):Promise<void>{
        return this.userService.updateUser(id,user, req)
    }

    @Put('admin/:id')
    @ApiOperation({summary:'Ruta para crear un admin'})
    @ApiBearerAuth()
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard,RolesGuard)
    async createAdmin(@Param('id',ParseUUIDPipe) id:string):Promise<void>{
        return this.userService.createAdmin(id)
    }
    
    @Delete(':id')
    @ApiOperation({summary:'Elimina los datos de un paciente por ID'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async deleteUser(@Req()req,@Param('id',ParseUUIDPipe) id:string){
        return this.userService.deleteUser(id,req)
    }
}