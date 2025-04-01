import { IsNotEmpty, IsString } from "class-validator";

export class CreateFavoriteDto {

    @IsNotEmpty()
    @IsString()
    user_id: string; 
    @IsNotEmpty()
    @IsString()
    product_id: string; 

}


/*
Body example:

{
    "user_id": "ed0bbb21-0373-4f08-a390-3b3f78687a97",
    "product_id": "823e8d21-3994-468e-ab6f-f8ec885585b9"
}


*/
