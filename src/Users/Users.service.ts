import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from "./Users.repository";
import { Users } from "./User.entity";
import { UsersDTOPost,UsersDTOPut} from './UserDTO/UserDTO'
import * as bcrypt from 'bcrypt'
@Injectable()
export class UserService {
    
    constructor(private readonly usersRepository: UsersRepository) {}

    async getAllUsers(){
        return await this.usersRepository.getAllUsers();
    }
    async getAllUsersPage(page,limit): Promise<Users[]> {
        return await this.usersRepository.getAllUsersPage(page,limit);
    }

    async getUserById(id:string): Promise<Users> {
        return await this.usersRepository.getUserById(id)
    }

    async addUser(user: UsersDTOPost): Promise<Users> {
        const usuario = await this.usersRepository.getUserByMail(user.email);
        if (usuario) {
            throw new BadRequestException('El usuario ya existe');
        }
        if (user.password !== user.passwordConfirm) {
            throw new BadRequestException('Las contraseñas no coinciden');
        }
        const passHash = await bcrypt.hash(user.password, 10);
        user.password = passHash;
        return await this.usersRepository.addUser(user);
    }

    async updateUser(id:string,userDto:UsersDTOPut,req):Promise<void>{
        const user = req.user
        if(user.sub==id){
            console.log('adentro')
            return this.usersRepository.updateUser(id, userDto)
        }else{
            throw new BadRequestException('Soliocitud no valida')
        }
    }

    async createAdmin(id: string):Promise<void> {
        return this.usersRepository.createAdmin(id)
    }

    async deleteUser(id:string,req){
        const user = req.user
        if(user.sub==id){
            console.log('adentro')
            return this.usersRepository.deleteUser(id)
        }else{
            throw new BadRequestException('Soliocitud no valida')
        }
    }
}