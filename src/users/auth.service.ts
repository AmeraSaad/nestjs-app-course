
import { BadRequestException, Injectable } from "@nestjs/common";
import { LoginDto } from "./dtos/login.dto";
import { AccessTokenType, JWTPayloadType } from "src/utils/types";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { RegisterDto } from "./dtos/register.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    
       constructor(
            @InjectRepository(User)
            private readonly userRepository: Repository<User>,
            private readonly jwtService: JwtService,
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
    
            const hashedPassword = await this.hashPassword(password);
    
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

        /**
         * Hash password
         * @param password password to hash
         * @returns hashed password
         */
        public async hashPassword(password: string): Promise<string>{
            const salt = await bcrypt.genSalt(10);
            return bcrypt.hash(password, salt);
        }

        /**
         * Generate JWT
         * @param user user to generate JWT for
         * @returns JWT (access token)
         */
        private async generateJWT(user: User): Promise<string>{
            const payload:JWTPayloadType = { id: user.id, userType: user.userType};
            return this.jwtService.signAsync(payload);
        }
}