import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './../user/schemas/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserCreatedListener } from './listeners/user-created.listener';
import { AuthStrategy } from './startegy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy, UserCreatedListener],
})
export class AuthModule {}
