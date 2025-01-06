import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schema/user.schema";
import { Url, UrlSchema } from "./schema/url.schema";

@Module({
    controllers:[AuthController],
    providers:[AuthService],
    imports:[MongooseModule.forFeature([
        {
            name:User.name,
            schema:UserSchema
        },
        {
            name:Url.name,
            schema:UrlSchema
        }
    ]),
],
})
export class AuthModule{}