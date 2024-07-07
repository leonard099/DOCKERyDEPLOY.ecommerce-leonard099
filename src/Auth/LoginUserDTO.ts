import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class loginUserDTO{
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description:'El email del usuario',
        example:'usuario@ejemplo.com',
    })
    email:string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description:'La contraseña del usuario',
        example:'12345678aA!',
    })
    password:string
}