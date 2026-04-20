import { BadRequestException, Injectable } from "@nestjs/common";
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

@Injectable()
export class UserService{

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
    ){}

    /**
     * Create new user
     * @param registerDto data for creating new user
     * @returns JWT (access token)
     */
    public async register(registerDto: RegisterDto): Promise<AccessTokenType> {
        const {email, username, password} = registerDto;

        const userFromdb = await this.userRepository.findOne({ where: { email } });

        if (userFromdb) throw new BadRequestException('User already exists');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let user = this.userRepository.create({
            email,
            username,
            password: hashedPassword
        })

        await this.userRepository.save(user);

        const accessToken = await this.generateJWT(user);
        
        return { accessToken };
    }

    /**
     * Get user by id
     * @param id user id
     * @returns user
     */
    public async getCurrentUser(beararToken:string) {
        const [_, token] = beararToken.split(" ");
        
        const payload= await this.jwtService.verifyAsync(token,{
            secret: this.config.get<string>('JWT_SECRET'),
        });

        const user = await this.userRepository.findOne({ where: { id: payload.id } });
        if (!user) throw new BadRequestException('User not found');
        return user;
    }

    /**
     * Login user
     * @param loginDto data for logging in
     * @returns JWT (access token)
     */
    public async login(loginDto: LoginDto): Promise<AccessTokenType> {
        const {email, password} = loginDto;

        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) throw new BadRequestException('Invalid email or password');

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) throw new BadRequestException('Invalid email or password');

        const accessToken = await this.generateJWT(user);
        
        return { accessToken };
    }


    private async generateJWT(user: User): Promise<string>{
        const payload:JWTPayloadType = { id: user.id, UserType: user.userType};
        return this.jwtService.signAsync(payload);
    }
    
}
