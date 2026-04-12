import { Controller,
    Get,
    Post, 
    Body, 
    Param, 
    NotFoundException, 
    Put, 
    Delete,
    Req,
    Res,
    Headers,
    ParseIntPipe,
    ValidationPipe
} from "@nestjs/common";

import { createProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import express from "express";

export type ProductType = {
    id: number;
    title: string;
    price: number;
}

@Controller('api/products')
export class ProductController{

    private products: ProductType[] = [   
            {   id: 1,
                title: 'Product 1',
                price: 100
            },
            {
                id: 2,
                title: 'Product 2',
                price: 200
            },
            {
                id: 3,
                title: 'Product 3',
                price: 300
            }];

    // POST: ~/api/products/express-way
    @Post('express-way')
    public CreateProjectExpressWay(
        @Req() req:express.Request, 
        @Res({passthrough: true}) res:express.Response,
        @Headers() headers:any
        ){
        const newProduct: ProductType = {
            id: this.products.length + 1,
            title: req.body.title,
            price: req.body.price
        }

        this.products.push(newProduct);
        console.log(req.headers);  //express way to get headers
        // console.log(headers);  //nestjs way to get headers

        res.status(201).json(newProduct);
        
        // res.cookie('authCookie', 'This is a cookie from product controller', 
        //     {
        //         httpOnly: true,
        //         maxAge: 1000 * 60 * 60 * 24
        //     }
        // );

    }

    // POST: ~/api/products
    @Post()
    public CreateNewProduct(@Body() body:createProductDto){
        const newProduct: ProductType = {
            id: this.products.length + 1,
            title: body.title,
            price: body.price
        }
        this.products.push(newProduct);
        return newProduct;
    }

    // GET: ~/api/products
    @Get()
    public getAllProducts(){
        return this.products;
    }

    // GET: ~/api/products/:id
    @Get(':id')
    public getSingleProducts(@Param("id", ParseIntPipe) id: number){
        const product= this.products.find((product) => product.id === id);

        if(!product) throw new NotFoundException("Product with this id is not found");
        return product;
    }

    // PUT: ~/api/products/:id
    @Put(':id')
    public updateProduct(
        @Param("id",ParseIntPipe) id: number, 
        @Body() body:UpdateProductDto
    ){
        const product = this.products.find((product) => product.id === id);

        if(!product) throw new NotFoundException("Product with this id is not found");

        console.log(body);
        return {message : "Product updated successfully with id " + id};
    }

    // DELETE: ~/api/products/:id
    @Delete(':id')
    public deleteProduct(@Param("id",ParseIntPipe) id: number){
        const product = this.products.find((product) => product.id === id);
        
        if(!product) throw new NotFoundException("Product with this id is not found");
        
        return {message : "Product deleted successfully"};
    
    }
}