
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(250)
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
}
