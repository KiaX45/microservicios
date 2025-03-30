import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

//el partial type es para que no sea obligatorio enviar todos los campos
export class UpdateProductDto extends PartialType(CreateProductDto) {

    //Pero podemos crear nuevas propiedades que no existen en el dto original 
    @IsString()
    @IsUUID()
    @IsOptional()
    id?:string;
}
