import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserDocument } from "src/user/schemas/user.schema";


@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy){
  constructor(@InjectModel("users") private userModel: Model<UserDocument>, config:ConfigService){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get("JWT_SECRET"),
    });
  }

  async validate(payload:{
      email:string;
      sub:string;
  }){
    
    let user = await this.userModel.findOne({email:payload.email,_id:payload.sub},{ 'password': 0  }).clone()

    return user;

  }

}