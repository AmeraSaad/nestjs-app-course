import { Controller, Get } from "@nestjs/common";
import { UserService } from "./users.service";
import { ReviewsService } from "src/reviews/reviewes.service";

@Controller('/api/users')
export class UsersController {

    constructor(private readonly userService: UserService) {}

    @Get()
    public getAllUsers() {
        return this.userService.getAll();
    }
}