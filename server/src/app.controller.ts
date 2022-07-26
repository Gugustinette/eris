import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() body) {
    const user = await this.authService.login({
      username: body.username,
      password: body.password,
    });
    if (user) {
      return user;
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('auth/signup')
  async signup(@Body() body) {
    return this.authService.signup({
      username: body.username,
      password: body.password,
    });
  }
}
