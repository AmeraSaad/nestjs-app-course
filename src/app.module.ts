import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ProductsModule,
    ReviewsModule, 
    UserModule,
    TypeOrmModule.forRoot({
        host: 'localhost',
        type: 'postgres',
        database: 'nestjs-app-db',
        port: 5432,
        username: 'postgres',
        password:'123456',
        synchronize: true, //only in development
        autoLoadEntities: true,
        entities:[],
      })
    ],


})
export class AppModule {}
