import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { IStyle } from './interfaces/style.interface';

@Injectable()
export class StyleGuard implements CanActivate {
  constructor(
    @Inject('STYLE_MODEL')
    private styleModel: Model<IStyle>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // Get the user from the request
    const user = request.user;
    // Get the Style ID from the url
    const styleId = request.params.id;
    // Check if the user is the owner of the Style
    return this.styleModel.findById(styleId).then((style) => {
      return style.user.toString() === user._id.toString();
    });
  }
}
