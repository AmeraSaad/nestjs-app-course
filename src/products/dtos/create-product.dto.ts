import {IsString, IsNumber, IsNotEmpty, Min, MinLength, Max, MaxLength, Length} from "class-validator"

export class createProductDto {
    @IsString({message: "Title must be a string, this is a custom message"})
    @IsNotEmpty()
    // @MinLength(3)
    // @MaxLength(150)
    @Length(3, 150)
    title: string

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number
}