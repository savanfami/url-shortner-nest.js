import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { CreateUrlDto, LoginDto, RegisterDto } from "./dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { Url } from "./schema/url.schema";
import * as shortid from 'shortid';
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<User>,
        @InjectModel(Url.name) private UrlModel: Model<Url>,
        private jwtService: JwtService
    ) { }

    async signup(dto: RegisterDto) {
        const { email, password, username } = dto
        const emailExist = await this.UserModel.findOne({ email })
        if (emailExist) {
            throw new ConflictException('email already in use')
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await this.UserModel.create({
            username,
            email,
            password: hashPassword
        })
        return {
            message: 'user created successfully'
        }
    }

    async signin(loginAuthDto: LoginDto) {
        try {
            const { email, password } = loginAuthDto;
            const user = await this.UserModel.findOne({ email: email });
            if (!user) {
                throw new UnauthorizedException('User not found');
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {``
                throw new UnauthorizedException('Incorrect  password');
            }
            const payload = { userId: user._id };
            const token = this.jwtService.sign(payload);
            return {
                access_token: token,
                message: 'Login successful'
            };
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            throw new InternalServerErrorException('An error occurred during sign in');
        }
    }

    async createUrl(createUrlDto: CreateUrlDto) {
        let exedUrl = await this.UrlModel.findOne({ longUrl: createUrlDto.url })
        if (exedUrl) {
            return {
                shortUrl: `https://url-shortner-nest-js.vercel.app/${exedUrl.shortUrl}`
            }
        }

        const shortId = shortid.generate();
        await this.UrlModel.create({
            longUrl: createUrlDto.url,
            shortUrl: shortId
        })
        return {
            shortUrl: `https://url-shortner-nest-js.vercel.app/${shortId}`
        }
    }

    async getUrlData(id: string) {
        try {
            const Url = await this.UrlModel.findOne({ shortUrl: id })
            if (!Url) {
                return new BadRequestException('This Id is not valid');
            }
            return Url.longUrl
        } catch (error) {
            console.log(error)
        }
    }

}