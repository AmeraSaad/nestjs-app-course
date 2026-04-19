import { Controller, Get } from "@nestjs/common";
import { ReviewsService } from "./reviewes.service";
@Controller('/api/reviews')
export class ReviewsController {

    constructor(private readonly reviewsService: ReviewsService) {}

    @Get()
    public getAllReviews() {
        return this.reviewsService.getAll();
    }
}