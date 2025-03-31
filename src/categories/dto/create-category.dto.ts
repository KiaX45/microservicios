import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsString()
    @IsOptional()
    description?:string;
}

//Example of body request
/*
{
    "name": "Category 1",
    "description": "Description of category 1"
}

*/


