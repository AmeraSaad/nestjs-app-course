import { Body, Controller, Get, HttpCode, HttpStatus, Post, Headers } from "@nestjs/common";
import { UserService } from "./users.service";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";

@Controller('/api/users')
export class UsersController {

    constructor(private readonly userService: UserService) {}

    // POST ~/api/users/auth/register
    @Post('auth/register')
    public register(@Body() body: RegisterDto){
        return this.userService.register(body);
    }

    // Post ~/api/users/auth/login
    @Post('auth/login') //201
    @HttpCode(HttpStatus.OK) //200
    public login(@Body() body: LoginDto){
        return this.userService.login(body);
    }
    
    // GET ~/api/users/current-user
    @Get('current-user')
    public getCurrentUser(@Headers() headers: any){
        return this.userService.getCurrentUser(headers.authorization);
     
    }


}
