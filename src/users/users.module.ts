import { Module} from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    controllers: [UsersController],
    providers:[UserService],
    imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule {}