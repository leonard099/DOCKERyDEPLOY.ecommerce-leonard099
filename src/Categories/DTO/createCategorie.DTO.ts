import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class createCategorieDTO{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description:'Nombre de la nueva categoria',
        example:'Articulos de hogar'
    })
    name:string
}