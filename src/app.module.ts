import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [ProductsModule, ReviewsModule, UserModule],
  // exports:[],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
