import { Module, forwardRef } from "@nestjs/common";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviewes.service";
import { UserModule } from "src/users/user.module";

@Module({
    controllers: [ReviewsController],
    providers: [ReviewsService],
    exports: [ReviewsService],
    imports: [forwardRef(() => UserModule)]
})
export class ReviewsModule {}