import { Module } from '@nestjs/common';
import { ProductController } from './productt.controller';

@Module({
    controllers: [ProductController]
})
export class ProductsModule {

}