import { Body, Controller, Get, HttpCode, HttpStatus, Post, Headers, UseGuards, Req } from "@nestjs/common";
import { UserService } from "./users.service";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";
import { AuthGuard } from "./guards/auth.guard";
import { currentUserDecorator } from "./decorators/current-user.decorator";
import type { JWTPayloadType } from "src/utils/types";


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
    @UseGuards(AuthGuard)
    public getCurrentUser(@currentUserDecorator() payload:JWTPayloadType){
    
        return this.userService.getCurrentUser(payload.id);
     
    }


}
