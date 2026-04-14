import { Injectable, NotFoundException } from "@nestjs/common";
import { createProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { UserService } from "src/users/users.service";

type ProductType = {
    id: number;
    title: string;
    price: number;
}

@Injectable()
export class ProductService {

    constructor(private readonly userService:UserService){}

    private products: ProductType[] = [   
        { id: 1,title: 'Product 1',price: 100},
        {id: 2,title: 'Product 2',price: 200},
        {id: 3,title: 'Product 3',price: 300}
    ];
    
    /**
     * Create a new product
     */
    public CreateProduct({title, price}:createProductDto){
        const newProduct: ProductType = {
            id: this.products.length + 1,
            title: title,
            price: price
        }
        this.products.push(newProduct);
        return newProduct;
    }

    /**
     * Get all products
     */
    public getAll(){
        const products= this.products;
        const users = this.userService.getAll();
        return {products, users};
    }

    /**
     * Get a single product by ID
     */
    public getOneBy(id: number){
        const product= this.products.find((product) => product.id === id);

        if(!product) throw new NotFoundException("Product with this id is not found");
        return product;
    }

    /**
     * Update a product by ID
     */
    public update(id: number, updateProductDto:UpdateProductDto){
        const product = this.products.find((product) => product.id === id);

        if(!product) throw new NotFoundException("Product with this id is not found");

        console.log(updateProductDto);
        return {message : "Product updated successfully with id " + id};
    }

    /**
     * Delete a product by ID
     */
    public delete(id: number){
        const product = this.products.find((product) => product.id === id);
        
        if(!product) throw new NotFoundException("Product with this id is not found");
        
        return {message : "Product deleted successfully"};
    
    }
}         