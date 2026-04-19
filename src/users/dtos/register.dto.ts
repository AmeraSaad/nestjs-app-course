import { IsEmail, isNotEmpty, IsNotEmpty, IsOptional, IsString, Length, MaxLength } from "class-validator";

export class RegisterDto {

    @IsEmail()
    @MaxLength(250)
    @IsNotEmpty()
    email: string;

    @IsString()
    @MaxLength(8)
    @IsOptional()
    username?: string;

    @IsString()
    @Length(2,150)
    @IsNotEmpty()
    password: string;
}
