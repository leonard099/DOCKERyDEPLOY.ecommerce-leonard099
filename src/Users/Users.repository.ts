import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./User.entity";
import { Repository } from "typeorm";
import { UsersDTOPost, UsersDTOPut} from './UserDTO/UserDTO'
import { UserRole } from "src/Decoradores/Roles.Decorator";
@Injectable()
export class UsersRepository {
    
  constructor(@InjectRepository(Users) private  userRository: Repository<Users>){}
    
    async getAllUsers():Promise<Users[]>{
        return await this.userRository.find({select:['id','name','email','address','city','country','orders','phone']});
    }
    async getAllUsersPage(page,limit):Promise<Users[]>{
        let users = await this.userRository.find({select:['id','name','email','address','city','country','orders','phone']})
        let inicio = (parseInt(page)-1)*parseInt(limit)
        let fin = inicio+parseInt(limit)
        return users.slice(inicio,fin);
    }

    async getUserById(id:string):Promise<Users>{
        return await this.userRository.findOne({where: {id},select:['id','name','email','address','city','country','orders','phone'], relations:['orders']});
    }
    //LISTA
    async addUser(user: UsersDTOPost):Promise<Users>{
      await this.userRository.save(user)
      return this.userRository.findOne({where: {email: user.email}, select:['id','name','email','address','city','country','orders','phone']}, )
    }

    
    async updateUser(id:string, userDto:UsersDTOPut):Promise<void>{
        const userDB = await this.userRository.findOne({where:{id}})
        if (userDB) {
            const userActualizado = await this.userRository.merge(userDB, userDto)
            await this.userRository.save(userActualizado)
        } else {
            throw new BadRequestException(`User id:${id} inexistente`)
        }
    }

    async createAdmin(id:string):Promise<void>{
      const userDB = await this.userRository.findOne({where:{id}})
      if(userDB){
        userDB.isAdmin=UserRole.ADMIN
        await this.userRository.save(userDB)
      }else{
        throw new BadRequestException('Usuario no valido')
      }
    }

    async deleteUser(id:string):Promise<void|string>{
        try {
          const user = await this.userRository.findOne({where:{id}})
          if (user) {
            await this.userRository.remove(user)
          } else {
            return 'usuario no existe'
          }
        } catch (error) {
          throw new Error ('Fallo al intentar eliminar usuario de la base de datos')
        }
    }

    async getUserByMail(email:string):Promise<Users>{
      return await this.userRository.findOne({where:{email}})
    }
}
      
  

        