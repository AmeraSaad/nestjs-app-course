import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MaxLength } from "class-validator";

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
    @IsOptional()
    @Length(2,150)
    password: string;
}
