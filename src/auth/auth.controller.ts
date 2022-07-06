import { Body, Controller, HttpCode, ParseIntPipe, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";


@Controller("auth")

export class AuthController {

    constructor(private authService:AuthService){}

    @Post('signup')
    signup(@Body() dto:AuthDto){
       console.log({
           dto
       })
       return 'signup page'
    }

    @Post('signin')
    signin(){
        
       return this.authService.login()
    }
}