import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./Auth.Service";
import {loginUserDTO} from './LoginUserDTO'
import { UserService } from "../Users/Users.service";
import { UsersDTOPost } from "../Users/UserDTO/UserDTO";
import { Users } from "../Users/User.entity";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService:UserService) {}

  @Post('signin')
  @ApiOperation({summary:'Iniciar sesion'})
  async signin(@Body() body:loginUserDTO):Promise<object> {
    const {email, password} = body;
    return await this.authService.signin(email, password);
  }

  @Post('signup')
  @ApiOperation({summary:'Crear un usuario'})
  async sigup(@Body() user: UsersDTOPost): Promise<Users> {
    return await this.userService.addUser(user);
  }
}