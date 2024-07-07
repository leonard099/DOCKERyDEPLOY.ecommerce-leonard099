import { IsNotEmpty, IsUUID, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductCarritoDto } from '../Products/ProductsDTO/ProductsCarritoDTO';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
    @IsUUID('all', { message: 'El userId debe tener un formato UUID válido' })
    @IsNotEmpty({ message: 'El userId no puede estar vacío' })
    @ApiProperty({
        description:'Id del usuario que compra',
        example:'123e4567-e89b-12d3-a456-426614174000',
    })
    userId: string;

    @IsArray({ message: 'Los productos deben ser proporcionados como un arreglo' })
    @ArrayMinSize(1, { message: 'Debe haber al menos un producto en la orden' })
    @ValidateNested({ each: true })
    @Type(() => ProductCarritoDto)
    @ApiProperty({
        description:'Array de id de productos que se compran',
        example:[{
            id: '123e4567-e89b-12d3-a456-426614174000'
        },
        {
            id: '123e4567-e89b-12d3-a456-426614174000'
        }],
    })
    products: ProductCarritoDto[];
}