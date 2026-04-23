import { Controller,
    Get,
    Post, 
    Body, 
    Param, 
    Put, 
    Delete,
    ParseIntPipe,
    UseGuards,
    Query,
} from "@nestjs/common";

import { createProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { ProductService } from "./products.service";
import { AuthGuard } from "src/users/guards/auth.guard";
import { Roles } from "src/users/decorators/user-role.decorator";
import { UserTypeEnum } from "src/utils/enums";
import { AuthRolesGuard } from "src/users/guards/auth-roles.guard";
import { currentUserDecorator } from "src/users/decorators/current-user.decorator";
import type { JWTPayloadType } from "src/utils/types";
import { title } from "process";


@Controller('api/products')
export class ProductController{

    constructor(private readonly productService: ProductService){}

    // POST: ~/api/products
    @Post()
    @UseGuards(AuthRolesGuard)
    @Roles(UserTypeEnum.ADMIN)
    public CreateNewProduct(@Body() body:createProductDto, @currentUserDecorator() payload:JWTPayloadType){
        return this.productService.CreateProduct(body, payload.id);
    }

    // GET: ~/api/products
    @Get()
    public getAllProducts(
        @Query('title') title:string,
        @Query('minPrice') minPrice:number,
        @Query('maxPrice') maxPrice:number,
    ){
        return this.productService.getAll(title,minPrice,maxPrice);
    }

    // GET: ~/api/products/:id
    @Get(':id')
    public getSingleProducts(@Param("id", ParseIntPipe) id: number){
        return this.productService.getOneBy(id);
    }

    // PUT: ~/api/products/:id
    @Put(':id')
    @UseGuards(AuthRolesGuard)
    @Roles(UserTypeEnum.ADMIN)
    public updateProduct( @Param("id",ParseIntPipe) id: number,  @Body() body:UpdateProductDto){
        return this.productService.update(id, body);
    }

    // DELETE: ~/api/products/:id
    @Delete(':id')
    @UseGuards(AuthRolesGuard)
    @Roles(UserTypeEnum.ADMIN)
    public deleteProduct(@Param("id",ParseIntPipe) id: number){
        return this.productService.delete(id);
    }
}