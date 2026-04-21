import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from './products/product.entity';
import { Review } from './reviews/review.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';

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
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: process.env.NODE_ENV !== 'production',
        }),
      }),
      ConfigModule.forRoot({ 
        isGlobal: true,
        envFilePath: `.env.${process.env.NODE_ENV}`,
      }),
    ],

    providers:[
      {
        provide:APP_INTERCEPTOR,
        useClass:ClassSerializerInterceptor,
      }
    ]

})
export class AppModule {}
