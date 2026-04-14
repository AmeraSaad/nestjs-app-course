import { Module } from '@nestjs/common';
import { ProductController } from './productt.controller';
import { ProductService } from './product.service';
import { UserModule } from 'src/users/user.module';

@Module({
    controllers: [ProductController],
    providers: [ProductService],
    imports: [UserModule],
})
export class ProductsModule {

}