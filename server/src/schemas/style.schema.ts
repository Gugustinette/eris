import * as mongoose from 'mongoose';

export const StyleSchema = new mongoose.Schema({
  name: String,
  description: String,
  domain: String,
  css: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  username: String,
  nbDownloads: {
    type: Number,
    default: 0,
  },
  images: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
