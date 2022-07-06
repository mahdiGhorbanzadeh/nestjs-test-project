import { Injectable } from "@nestjs/common";
import { UserModel, BookMarkModel } from "./../../mongo/schema/index"

@Injectable()

export class AuthService {
    login(){
        return 'signin page'
    }

    signup(){
        
    }
} 