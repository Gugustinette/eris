import { Document } from 'mongoose';

export interface IStyle extends Document {
  _id: string;
  user: any;
  name: string;
  domain: string;
  css: string;
  nbDownloads: number;
}
