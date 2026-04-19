import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { UserService } from "src/users/users.service";

@Injectable()
export class ReviewsService{

    constructor() {}
    
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