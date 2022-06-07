import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() body) {
    return this.authService.login({
      username: body.username,
      password: body.password,
    });
  }

  @Post('auth/signup')
  async signup(@Body() body) {
    return this.authService.signup({
      username: body.username,
      password: body.password,
    });
  }
}
