import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { IUser } from 'src/users/interfaces/user.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(@Inject('USER_MODEL') private userModel: Model<IUser>) {
    super();
  }

  doesUserExist(user: IUser) {
    return this.userModel.findOne({ _id: user._id }).then((user) => {
      if (!user) {
        return false;
      }
      return true;
    });
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user = super.canActivate(context);
    // If user is promise
    if (user instanceof Promise) {
      // Wait for user to be resolved
      return user.then(() => {
        // Check if user exists
        return this.doesUserExist(
          context.switchToHttp().getRequest().user,
        ).then((doesUserExist) => {
          // Return true if user exists
          return doesUserExist;
        });
      });
    } else {
      return false;
    }
  }
}
