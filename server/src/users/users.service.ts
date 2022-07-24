import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { IStyle } from 'src/style/interfaces/style.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
    @Inject('STYLE_MODEL')
    private styleModel: Model<IStyle>,
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

  async deleteUser(_id: string): Promise<IUser> {
    // Find and delete the user
    return this.userModel.findOneAndDelete({ _id }).then((user) => {
      // Delete every style that belongs to the user
      this.styleModel.deleteMany({ user: user._id }).exec();
      // Return the user
      return user;
    });
  }
}
