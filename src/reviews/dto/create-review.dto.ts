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




