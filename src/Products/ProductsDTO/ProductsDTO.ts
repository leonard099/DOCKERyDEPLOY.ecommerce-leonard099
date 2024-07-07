import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsBoolean, IsString, IsUrl, IsOptional, isNotEmpty } from 'class-validator';
import { UUID } from 'crypto';

export class CreateProductDto {
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
    @ApiProperty({description:'Nombre del producto',example:'Teclado'})
    name: string;

    @IsNotEmpty({ message: 'La descripción es requerida' })
    @IsString({ message: 'La descripción debe ser una cadena de caracteres' })
    @ApiProperty({description:'Descripcion detallada del producto', example:'Es un teclado mecanico'})
    description: string;

    @IsNotEmpty({ message: 'El precio es requerido' })
    @IsNumber({}, { message: 'El precio debe ser un número' })
    @ApiProperty({description:'Precio del producto a publicar',example:500})
    price: number;

    @IsNotEmpty({ message: 'El stock es requerido' })
    @IsNumber()
    @ApiProperty({description:'Stock inicial de productos', example:100})
    stock: number;

    @IsNotEmpty({message:'ID de la categoria que le corresponde'})
    @ApiProperty({description:'ID de la categoria que le corresponde',example:'eac1fd56-6a08-45fd-8024-ec94a60c97f0'})
    categoriesId:UUID

    @IsNotEmpty({ message: 'La URL de la imagen es requerida' })
    @IsUrl({}, { message: 'La URL de la imagen no tiene un formato válido' })
    @ApiProperty({description:'Url de la imagen, puede no venir'})
    @IsOptional()
    imgUrl?: string;
}

export class ModificarProductDto {
    @IsNotEmpty()
    @IsOptional()
    @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
    @ApiPropertyOptional({description:'Nombre del producto, puede no venir',example:'Teclado'})
    name?: string;

    @IsNotEmpty()    
    @IsOptional()
    @IsString({ message: 'La descripción debe ser una cadena de caracteres' })
    @ApiPropertyOptional({description:'Descripcion detallada del producto, puede no venir', example:'Es un teclado inalambrico'})
    description?: string;

    @IsNotEmpty()
    @IsOptional()
    @IsNumber({}, { message: 'El precio debe ser un número' })
    @ApiPropertyOptional({description:'Precio del producto a publicar, puede no venir',example:1000})
    price?: number;

    @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({description:'Precio del producto a publicar, puede no venir',example:50})
    stock?: number;

    @IsOptional()
    @IsNotEmpty({message:'ID de la categoria que le corresponde'})
    @ApiProperty({description:'ID de la categoria que le corresponde',example:'eac1fd56-6a08-45fd-8024-ec94a60c97f0'})
    categoriesId:UUID

    @IsNotEmpty()
    @IsOptional()
    @IsUrl({}, { message: 'La URL de la imagen no tiene un formato válido' })
    @ApiPropertyOptional({description:'Url de la imagen, puede no venir'})
    imgUrl?: string;
}
