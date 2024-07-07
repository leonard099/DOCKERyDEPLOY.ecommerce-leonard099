import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID} from 'class-validator';

export class ProductCarritoDto {
    @IsUUID('all', { message: 'El userId debe tener un formato UUID válido' })
    @IsNotEmpty({ message: 'El userId no puede estar vacío' })
    @ApiProperty({
        description:'Id del producto que se compra',
        example:'123e4567-e89b-12d3-a456-426614174000',
    })
    id: string;
}
