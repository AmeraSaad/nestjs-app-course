import { BadRequestException, Injectable } from "@nestjs/common";
import { RegisterDto } from "./dtos/register.dto";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService{

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    /**
     * Create new user
     * @param registerDto data for creating new user
     * @returns JWT (access token)
     */
    public async register(registerDto: RegisterDto){
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

        // @TODO -> generate JWT token
        return user;
    }


}
