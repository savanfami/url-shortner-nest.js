import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
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
        const payload = { userId: user._id }
        const token = this.jwtService.sign(payload)
        return {
            token,
            message: 'user created successfully'
        }
    }

    async signin(loginAuthDto: LoginDto) {
        const { email, password } = loginAuthDto;
        const data = await this.UserModel.findOne({ email });

        if (!data) {
            return new UnauthorizedException('Email is not valid');
        }

        if (!(await bcrypt.compare(password, data.password))) {
            return new UnauthorizedException('Password is not match');
        }

        const payload = { userId: data._id }
        const token = this.jwtService.sign(payload)
        return {
            access_token:token,
            message: 'login successfully'
        }
    }

    async createUrl(createUrlDto: CreateUrlDto) {
        console.log(createUrlDto);

        const { url } = createUrlDto
        let exedUrl = await this.UrlModel.findOne({ longUrl: createUrlDto.url })
        if (exedUrl) {
            return {
                shortUrl: `http://localhost:5173/shortUr/${exedUrl.shortUrl}`
            }
        }

        const shortId = shortid.generate();
        await this.UrlModel.create({
            longUrl: createUrlDto.url,
            shortUrl: shortId
        })
        return {
            shortUrl: `http://localhost:5173/shortUrl/${shortId}`
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

        }
    }

}