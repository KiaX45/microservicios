import { IsNotEmpty, IsString } from "class-validator";

export class CreateFavoriteDto {

    @IsNotEmpty()
    @IsString()
    user_id: string; 
    @IsNotEmpty()
    @IsString()
    product_id: string; 

}
