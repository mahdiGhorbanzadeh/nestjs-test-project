import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, UserDocument } from './../user/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MongoError } from 'mongodb';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './events/user-created.events';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users') private userModel: Model<UserDocument>,
    private jwt: JwtService,
    private config: ConfigService,
    private eventEmitter: EventEmitter2,
  ) {}

  async signin(dto: AuthDto) {
    let user = await this.userModel
      .findOne(
        {
          email: dto.email,
        },
        function (err, res) {},
      )
      .clone();

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    if (!(await argon2.verify(user.password, dto.password))) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user._id, user.email);
  }

  async signup(dto: AuthDto) {
    let user;

    dto.password = await argon2.hash(dto.password);

    try {
      user = new this.userModel({
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await user.save();
    } catch (e) {}

    const userCreatedEvent = new UserCreatedEvent();

    userCreatedEvent._id = user._id;

    userCreatedEvent.description = 'user created!';

    try {
      this.eventEmitter.emit('user.created', userCreatedEvent);
    } catch (e) {}

    return this.signToken(user._id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ jwt_token: string }> {
    let payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });

    return await { jwt_token: token };
  }
}
