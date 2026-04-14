import { Controller, Get } from "@nestjs/common";
import { ReviewsService } from "./reviewes.service";
import { UserService } from "src/users/users.service";

@Controller('/api/reviews')
export class ReviewsController {

    constructor(private readonly reviewsService: ReviewsService, private readonly userService: UserService) {}

    @Get()
    public getAllReviews() {
        return this.reviewsService.getAll();
    }
}