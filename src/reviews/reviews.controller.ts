import { Controller, Get } from "@nestjs/common";

@Controller()
export class ReviewController {

    @Get('/api/reviews')
    public getAllReviews() {
        return [
            {
                id: 1,
                rating: 4,
                comment: 'Great product!'
            },
            {
                id: 2,
                rating: 5,
                comment: 'Excellent product!'
            },
            {
                id: 3,
                rating: 3,
                comment: 'Average product.'
            }
        ]
    }
}