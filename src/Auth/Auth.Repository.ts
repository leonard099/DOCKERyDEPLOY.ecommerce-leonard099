import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "../Users/Users.repository";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthRepository {
    
    constructor(private usersRepository: UsersRepository, private readonly jwtService: JwtService) {}
    async signin(email: string, password: string): Promise<object> {

        const user = await this.usersRepository.getUserByMail(email)

        if (!user) {
            throw new NotFoundException("Email o password incorrectos");
        }

        const validarPass = await bcrypt.compare( password, user.password)
        
        if (!validarPass) {
            throw new NotFoundException("Email o password incorrectos");
        }

        const payload = { email: user.email, sub: user.id, role: user.isAdmin };

        const token = this.jwtService.sign( payload );

        return {token:token};
    }
}