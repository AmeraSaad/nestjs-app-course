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
import { ProductService } from "./product.service";


@Controller('api/products')
export class ProductController{

    constructor(private productService: ProductService){}
    
    // POST: ~/api/products
    @Post()
    public CreateNewProduct(@Body() body:createProductDto){
        return this.productService.CreateProduct(body);
    }

    // GET: ~/api/products
    @Get()
    public getAllProducts(){
        return this.productService.getAll();
    }

    // GET: ~/api/products/:id
    @Get(':id')
    public getSingleProducts(@Param("id", ParseIntPipe) id: number){
        return this.productService.getOneBy(id);
    }

    // PUT: ~/api/products/:id
    @Put(':id')
    public updateProduct( @Param("id",ParseIntPipe) id: number,  @Body() body:UpdateProductDto){
        return this.productService.update(id, body);
    }

    // DELETE: ~/api/products/:id
    @Delete(':id')
    public deleteProduct(@Param("id",ParseIntPipe) id: number){
        return this.productService.delete(id);
    }
}