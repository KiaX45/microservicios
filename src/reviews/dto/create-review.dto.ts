import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty()
    user_id: string;
    @IsString()
    @IsNotEmpty()
    product_id: string;
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    rating: number;
    @IsString()
    @IsOptional()
    comment?: string;


}


/*
bodyexample
 {
    "user_id": "ed0bbb21-0373-4f08-a390-3b3f78687a97",
    "product_id": "823e8d21-3994-468e-ab6f-f8ec885585b9",
    "rating": 5,
    "comment": "Great product!"
 }


*/



