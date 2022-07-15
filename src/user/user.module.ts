import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schemas/user.schema";
import {UserController} from "./user.controller";


@Module({
    imports:[MongooseModule.forFeature([{ name:"users", schema: UserSchema }])],
    controllers:[UserController],
    exports: [MongooseModule]
})
export class UserModule {}