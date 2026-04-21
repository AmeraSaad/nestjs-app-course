import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { createProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { InjectRepository } from "@nestjs/typeorm";

type ProductType = {
    id: number;
    title: string;
    price: number;
}

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product) 
        private readonly productRepository: Repository<Product>
    ){}
    
    /**
     * Create a new product
     */
    public async CreateProduct(createProductdto:createProductDto){
        const product = this. productRepository.create(createProductdto);
        await this.productRepository.save(product);
        return product;
    }

    /**
     * Get all products
     */
    public getAll(){
        return this.productRepository.find();
    }

    /**
     * Get a single product by ID
     */
    public async getOneBy(id: number){
        const product = await this.productRepository.findOne({ where: { id } });

        if(!product) throw new NotFoundException("Product with this id is not found");
        return product;
    }

    /**
     * Update a product by ID
     */
    public async update(id: number, updateProductDto:UpdateProductDto){
        const product = await this.getOneBy(id);

        if(!product) throw new NotFoundException("Product with this id is not found");

        product.title = updateProductDto.title ?? product.title;
        product.price = updateProductDto.price ?? product.price;
        product.description = updateProductDto.description ?? product.description;

        await this.productRepository.save(product);
        return product;
    }

    /**
     * Delete a product by ID
     */
    public async delete(id: number){
        const product = await this.getOneBy(id);

        if(!product) throw new NotFoundException("Product with this id is not found");
        await this.productRepository.remove(product);
    
        return { message: "Product deleted successfully" };
    }
}         