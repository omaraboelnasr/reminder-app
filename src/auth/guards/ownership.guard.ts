import {
  Injectable,
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | boolean | Observable<boolean> {
    const authUserId = context.switchToHttp().getRequest().user?.userId;
    const targetUserId = context.switchToHttp().getRequest().params?.id;
    if (authUserId !== targetUserId) {
      throw new UnauthorizedException(
        'You are not authorized to update this user.',
      );
    }
    return true;
  }
}
