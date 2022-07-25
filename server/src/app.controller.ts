import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() body, @Res() res) {
    const user = await this.authService.login({
      username: body.username,
      password: body.password,
    });
    if (user) {
      return user;
    } else {
      return res.status(HttpStatus.NOT_FOUND).send({
        message: 'Invalid username or password',
      });
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
