import {IsString, IsNumber, IsNotEmpty, Min, MinLength, Max, MaxLength, Length, IsOptional} from "class-validator"

export class UpdateProductDto {
    @IsString({message: "Name must be a string, this is a custom message"})
    @IsNotEmpty()
    // @MinLength(3)
    // @MaxLength(150)
    @Length(3, 150)
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
    description?: string

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @IsOptional()
    price?: number
}