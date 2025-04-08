import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsString()
    @IsOptional()
    imgUrl: string;
}

//example of body request
/*
{
    "name": "John Doe",
    "email": "JohnDoe@gmail.com",
    "password": "123456",
    "imgUrl": "https://example.com/johndoe.jpg"
}

*/
