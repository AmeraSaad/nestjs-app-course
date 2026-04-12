import { Controller, Get } from "@nestjs/common";

@Controller()
export class UsersController {
    
    @Get('/api/users')
    public getAllUsers() {
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