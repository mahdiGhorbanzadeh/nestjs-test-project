import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  ParseIntPipe,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { LoggingInterceptor } from 'src/logging.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @UseInterceptors(new LoggingInterceptor())
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
