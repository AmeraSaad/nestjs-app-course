import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService{

    public getAll() {
        return [
            {
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com'

            },
            {
                id: 2,
                name: 'Bob Smith',
                email: 'bob.smith@example.com'
            }
        ]
    }
}