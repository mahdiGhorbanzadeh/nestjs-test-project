import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    password:string

    @IsEmail()
    @IsNotEmpty()
    email:string
}