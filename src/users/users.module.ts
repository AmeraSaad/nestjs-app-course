import { Module} from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { StringValue } from "ms";

@Module({
    controllers: [UsersController],
    providers:[UserService],
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
              global: true,
              secret: configService.getOrThrow<string>("JWT_SECRET"),
              signOptions: {
                expiresIn: configService.getOrThrow<string>("JWT_EXPIRES_IN") as StringValue
              },
            }),
        })
    ]
})
export class UserModule {}