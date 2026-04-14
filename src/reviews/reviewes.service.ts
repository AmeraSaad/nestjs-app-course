import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { UserService } from "src/users/users.service";

@Injectable()
export class ReviewsService{

    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService) {}
    
    public getAll() {
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