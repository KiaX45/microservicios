import { IsNotEmpty, IsString } from "class-validator"



export class signInDto {
    @IsNotEmpty()
    @IsString()
    email: string
    @IsNotEmpty()
    @IsString()
    password: string
}