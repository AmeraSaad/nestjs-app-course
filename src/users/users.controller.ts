import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./users.service";
import { RegisterDto } from "./dtos/register.dto";

@Controller('/api/users')
export class UsersController {

    constructor(private readonly userService: UserService) {}

    // POST ~/api/users/auth/register
    @Post('auth/register')
    public register(@Body() body: RegisterDto){
        return this.userService.register(body);
    }

    
}
