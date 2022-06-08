import * as mongoose from 'mongoose';

export const StyleSchema = new mongoose.Schema({
  name: String,
  domain: String,
  css: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  nbDownloads: {
    type: Number,
    default: 0,
  },
});
