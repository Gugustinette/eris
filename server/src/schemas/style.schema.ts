import * as mongoose from 'mongoose';

export const StyleSchema = new mongoose.Schema({
  name: String,
  domain: String,
  css: String,
});
