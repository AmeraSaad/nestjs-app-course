import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from './products/product.entity';

@Module({
  imports: [
    ProductsModule,
    ReviewsModule, 
    UserModule,
    TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_DATABASE'),
          entities: [Product],
          synchronize: process.env.NODE_ENV !== 'production',
        }),
      }),
      ConfigModule.forRoot({ 
        isGlobal: true,
        envFilePath: `.env.${process.env.NODE_ENV}`,
      }),
    ],


})
export class AppModule {}
