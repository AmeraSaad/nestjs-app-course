import { Body, Controller, Get, HttpCode, HttpStatus, Post, Headers, UseGuards, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";
import { AuthGuard } from "./guards/auth.guard";
import { currentUserDecorator } from "./decorators/current-user.decorator";
import type { JWTPayloadType } from "src/utils/types";
import { Role } from "./decorators/user-role.decorator";
import { UserTypeEnum } from "src/utils/enums";
import { AuthRolesGuard } from "./guards/auth-roles.guard";


@Controller('/api/users')
export class UsersController {

    constructor(private readonly UsersService: UsersService) {}

    // POST ~/api/users/auth/register
    @Post('auth/register')
    public register(@Body() body: RegisterDto){
        return this.UsersService.register(body);
    }

    // Post ~/api/users/auth/login
    @Post('auth/login') //201
    @HttpCode(HttpStatus.OK) //200
    public login(@Body() body: LoginDto){
        return this.UsersService.login(body);
    }
    
    // GET ~/api/users/current-user
    @Get('current-user')
    @UseGuards(AuthGuard)
    public getCurrentUser(@currentUserDecorator() payload:JWTPayloadType){
    
        return this.UsersService.getCurrentUser(payload.id);
    }

    // GET ~/api/users/all
    @Get()
    @Role(UserTypeEnum.ADMIN)
    @UseGuards(AuthRolesGuard)
    public getAll(){
        return this.UsersService.getAll();
    }


}
