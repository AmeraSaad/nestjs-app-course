import { Body, Controller, Get, HttpCode, HttpStatus, Post, Headers, UseGuards, Req, Put, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";
import { AuthGuard } from "./guards/auth.guard";
import { currentUserDecorator } from "./decorators/current-user.decorator";
import type { JWTPayloadType } from "src/utils/types";
import { Roles } from "./decorators/user-role.decorator";
import { UserTypeEnum } from "src/utils/enums";
import { AuthRolesGuard } from "./guards/auth-roles.guard";
import { UpdateUserDto } from "./dtos/update-user.dto";


@Controller('/api/users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
    ) {}

    // POST ~/api/users/auth/register
    @Post('auth/register')
    public register(@Body() body: RegisterDto){
        return this.usersService.register(body);
    }

    // Post ~/api/users/auth/login
    @Post('auth/login') //201
    @HttpCode(HttpStatus.OK) //200
    public login(@Body() body: LoginDto){
        return this.usersService.login(body);
    }
    
    // GET ~/api/users/current-user
    @Get('current-user')
    @UseGuards(AuthGuard)
    public getCurrentUser(@currentUserDecorator() payload:JWTPayloadType){
        return this.usersService.getCurrentUser(payload.id);
    }

    // GET ~/api/users/all
    @Get()
    @Roles(UserTypeEnum.ADMIN)
    @UseGuards(AuthRolesGuard)
    public getAll(){
        return this.usersService.getAll();
    }

    // Put ~/api/users
    @Put()
    @Roles(UserTypeEnum.USER, UserTypeEnum.ADMIN)
    @UseGuards(AuthRolesGuard)
    public updateUser(@currentUserDecorator() payload:JWTPayloadType, @Body() body: UpdateUserDto){
        return this.usersService.update(payload.id, body);
    }

    // Delete ~/api/users
    @Delete(":id")
    @Roles(UserTypeEnum.USER, UserTypeEnum.ADMIN)
    @UseGuards(AuthRolesGuard)
    public deleteUser(@Param("id", ParseIntPipe) id:number, @currentUserDecorator() payload:JWTPayloadType){
        return this.usersService.delete(id,payload);
    }

}
