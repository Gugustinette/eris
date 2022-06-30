import { Document } from 'mongoose';

export interface IStyle extends Document {
  _id: string;
  user: any;
  username: string;
  name: string;
  description: string;
  domain: string;
  css: string;
  nbDownloads: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
