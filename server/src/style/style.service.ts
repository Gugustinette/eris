import { Injectable, Inject } from '@nestjs/common';
import { IStyle } from './interfaces/style.interface';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';
import { Model, Types } from 'mongoose';
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
    return this.styleModel.find().limit(20).exec();
  }

  findOne(id: string) {
    return this.styleModel.findOne({ _id: id }).exec();
  }

  search(query: string) {
    // Create object id from query
    const queryId = query.split(' ').map((word) => {
      if (word.length === 24) {
        return new Types.ObjectId(word);
      } else {
        return undefined;
      }
    });
    // Find in name or description or _id
    return this.styleModel
      .find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { _id: { $in: queryId } },
        ],
      })
      .limit(20)
      .exec();
  }

  update(id: string, updateStyleDto: UpdateStyleDto) {
    const updatedStyle = {
      ...updateStyleDto,
    } as any;
    updatedStyle.updatedAt = new Date();
    return this.styleModel
      .findOneAndUpdate({ _id: id }, updatedStyle, {
        new: true,
      })
      .exec();
  }

  remove(id: string) {
    return this.styleModel.deleteOne({ _id: id }).exec();
  }

  setImages(id: string, images: string[]) {
    return this.styleModel
      .findOneAndUpdate(
        { _id: id },
        {
          images,
          updatedAt: new Date(),
        },
        { new: true },
      )
      .exec();
  }
}
