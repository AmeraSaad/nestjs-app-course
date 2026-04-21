import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { RegisterDto } from "./dtos/register.dto";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcryptjs';
import { LoginDto } from "./dtos/login.dto";
import { JwtService } from "@nestjs/jwt";
import { AccessTokenType, JWTPayloadType } from "src/utils/types";
import { promises } from "dns";
import { ConfigService } from "@nestjs/config";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserTypeEnum } from "src/utils/enums";
import { AuthService } from "./auth.service";

@Injectable()
export class UsersService{

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly authService: AuthService
    ){}

      /**
     * Create new user
     * @param registerDto data for creating new user
     * @returns JWT (access token)
     */
    public async register(registerDto: RegisterDto): Promise<AccessTokenType> {
        return this.authService.register(registerDto);
    }

    /**
     * Login user
     * @param loginDto data for logging in
     * @returns JWT (access token)
     */
    public async login(loginDto: LoginDto): Promise<AccessTokenType> {
       return this.authService.login(loginDto);
    }

    /**
     * Get user by id
     * @param id user id
     * @returns user
     */
    public async getCurrentUser(id: number): Promise<User> {

        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) throw new BadRequestException('User not found');
        return user;
    }

    /**
     * Get all users
     * @returns all users
     */
    public getAll(): Promise<User[]>{
        return this.userRepository.find();
    }

    /** 
     * Update user
     * @param id id for the logged in user
     * @param updateuserDto data for updating user
     * @returns updated user
     */

    public async update(id: number, updateuserDto: UpdateUserDto){
        const {username, password} = updateuserDto;
        const user = await this.userRepository.findOne({where: {id}});

        if (!user) throw new BadRequestException('User not found');

        user.username = username ?? user.username;

        if (password) {
            user.password = await this.authService.hashPassword(password);
        }


        return this.userRepository.save(user);
    }

    /**
     * Delete user
     * @param id 
     * @param payload 
     * @returns a sucess message
     */
    public async delete(id:number, payload:JWTPayloadType){
        const user = await this.getCurrentUser(id);
        if(user.id === payload?.id || payload.userType === UserTypeEnum.ADMIN){
            await this.userRepository.remove(user);
            return {massage: "User has been deleted"}
        }
        throw new ForbiddenException('Access denied, You are not authorized to delete this user');
    }
}
