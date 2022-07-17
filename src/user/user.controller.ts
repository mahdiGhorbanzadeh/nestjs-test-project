import {
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { LoggingInterceptor } from 'src/logging.interceptor';
import { JwtGuard } from './../auth/guard/jwt.guard';

@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }
}
