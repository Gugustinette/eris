import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    if (user && user.password === pass) {
      // Truncate password
      user.password = undefined;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const userDb = await this.validateUser(user.username, user.password);
    return {
      access_token: this.jwtService.sign(
        {
          username: userDb.username,
          sub: userDb._id,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: '1h',
        },
      ),
    };
  }

  async signup(user: any) {
    const newUser = await this.usersService.createUser(user);
    return this.login(newUser);
  }
}
