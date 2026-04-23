import { Injectable, NotFoundException } from "@nestjs/common";
import { createProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { UsersService } from "src/users/users.service";
import { Repository, Like, Between} from "typeorm";
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
        private readonly productRepository: Repository<Product>,
        private readonly usersService: UsersService
    ){}
    
    /**
     * Create a new product
     * @param dto data for creating a new product
     * @param userId ID of the logged-in user
     * @returns the created product
     */
    public async CreateProduct(dto:createProductDto, userId: number){
        const user = await this.usersService.getCurrentUser(userId);
        const product = this. productRepository.create({
            ...dto,
            title: dto.title.toLowerCase(),
            user
        });
        await this.productRepository.save(product);
        return product;
    }

    /**
     * Get all products
     * @returns all products with their associated user and reviews
     */
    public getAll(title?: string, minPrice?: number, maxPrice?: number){
          const filter = {
            ...(title? { title: Like(`%${title.toLowerCase()}%`) } : {}),
            ...(minPrice !== undefined && maxPrice !== undefined ? { price: Between(minPrice, maxPrice) }: {}),
        };
        return this.productRepository.find({ where: filter });
    }

    /**
     * Get a single product by ID
     * @param id ID of the product to retrieve
     * @returns the product with the specified ID
     */
    public async getOneBy(id: number){
        const product = await this.productRepository.findOne({ where: { id } });

        if(!product) throw new NotFoundException("Product with this id is not found");
        return product;
    }

    /**
     * Update a product by ID
     * @param id ID of the product to update
     * @param updateProductDto data for updating the product
     * @returns the updated product
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
     * @param id ID of the product to delete
     * @returns success message
     */
    public async delete(id: number){
        const product = await this.getOneBy(id);

        if(!product) throw new NotFoundException("Product with this id is not found");
        await this.productRepository.remove(product);
    
        return { message: "Product deleted successfully" };
    }
}         