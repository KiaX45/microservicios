import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    price: number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    stock: number; // Stock del producto, no es necesario validarlo ya que se puede dejar en 0

    @IsString()
    @IsNotEmpty()
    categorieId: string; // Relación con Category de uno a muchos un producto puede tener muchas categorias
    
    @IsString()
    @IsOptional()
    imgUrl?: string; // URL de la imagen del producto
}



//body example

/*

{
    "name": "Producto 1",
    "description": "Descripción del producto 1",
    "price": 100,
    "stock": 10,
    "categorieId": "dbf1224b-c8e4-4310-962b-e599e86cb5b9",
    "imgUrl": "https://example.com/producto1.jpg"
}

*/