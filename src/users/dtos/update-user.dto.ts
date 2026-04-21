
import {IsNotEmpty, IsOptional, IsString, Length, MaxLength } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @MaxLength(8)
    @IsOptional()
    username?: string;

    @IsString()
    @Length(2,150)
    @IsOptional()
    password?: string;
}
