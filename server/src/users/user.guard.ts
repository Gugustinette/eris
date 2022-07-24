import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // Get the user from the request
    const user = request.user;
    // Get the User ID from the url
    const userId = request.params.id;
    // Check if the user is the same as the user in the request
    return user._id.toString() === userId;
  }
}
