import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
}
