import { Injectable } from "@nestjs/common";
import { AuthRepository } from './Auth.Repository'

@Injectable()
export class AuthService {
    constructor(private readonly authRepository: AuthRepository) {}
    
    signin(email: string, password: string): Promise<object> {
        return this.authRepository.signin(email, password);
    }
}