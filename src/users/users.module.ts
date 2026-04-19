import { Module,forwardRef } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { ReviewsModule } from "src/reviews/reviews.module";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    controllers: [UsersController],
    providers:[UserService],
    exports:[UserService],
    imports: [ forwardRef(() => ReviewsModule), TypeOrmModule.forFeature([User]) ]
})
export class UserModule {}