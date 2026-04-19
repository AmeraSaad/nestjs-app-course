import { Module, forwardRef } from "@nestjs/common";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviewes.service";
import { UserModule } from "src/users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./review.entity";
import { Product } from "src/products/product.entity";

@Module({
    controllers: [ReviewsController],
    providers: [ReviewsService],
    exports: [ReviewsService],
    imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([Review])]
})
export class ReviewsModule {}