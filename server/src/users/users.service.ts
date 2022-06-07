import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
  ) {}

  async getUser(username: string): Promise<IUser | undefined> {
    return this.userModel.findOne({ username });
  }

  async createUser(user: IUser): Promise<IUser> {
    // Verify that the user does not already exist
    const existingUser = await this.userModel.findOne({
      username: user.username,
    });
    if (existingUser) {
      // User allready exists
      throw new HttpException('User allready exists', HttpStatus.BAD_REQUEST);
    } else {
      // User doesn't exist, create it
      const newUser = new this.userModel(user);
      return newUser.save();
    }
  }
}
