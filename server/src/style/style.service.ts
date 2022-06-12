import { Injectable, Inject } from '@nestjs/common';
import { IStyle } from './interfaces/style.interface';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';
import { Model } from 'mongoose';
import { IUser } from 'src/users/interfaces/user.interface';

@Injectable()
export class StyleService {
  constructor(
    @Inject('STYLE_MODEL')
    private styleModel: Model<IStyle>,
  ) {}

  create(createStyleDto: CreateStyleDto, user: IUser) {
    const newStyle = {
      ...createStyleDto,
      user: user._id,
      username: user.username,
    };
    const createdStyle = new this.styleModel(newStyle);
    return createdStyle.save();
  }

  findAll() {
    return this.styleModel.find().exec();
  }

  findOne(id: string) {
    return this.styleModel.findOne({ _id: id }).exec();
  }

  update(id: string, updateStyleDto: UpdateStyleDto) {
    const updatedStyle = {
      ...updateStyleDto,
    } as any;
    updatedStyle.updatedAt = new Date();
    return this.styleModel.updateOne({ _id: id }, updatedStyle).exec();
  }

  remove(id: string) {
    return this.styleModel.deleteOne({ _id: id }).exec();
  }
}
