import { Controller,
    Get,
    Post, 
    Body, 
    Param, 
    Put, 
    Delete,
    ParseIntPipe,
} from "@nestjs/common";

import { createProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";


@Controller('api/products')
export class ProductController{

    // POST: ~/api/products
    @Post()
    public CreateNewProduct(@Body() body:createProductDto){

    }

    // GET: ~/api/products
    @Get()
    public getAllProducts(){

    }

    // GET: ~/api/products/:id
    @Get(':id')
    public getSingleProducts(@Param("id", ParseIntPipe) id: number){
        
    }

    // PUT: ~/api/products/:id
    @Put(':id')
    public updateProduct( @Param("id",ParseIntPipe) id: number,  @Body() body:UpdateProductDto){
        
    }

    // DELETE: ~/api/products/:id
    @Delete(':id')
    public deleteProduct(@Param("id",ParseIntPipe) id: number){

    
    }
}