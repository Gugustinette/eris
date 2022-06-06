import { Document } from 'mongoose';

export interface IStyle extends Document {
  _id: string;
  name: string;
  domain: string;
  css: string;
}
