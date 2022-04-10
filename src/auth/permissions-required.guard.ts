import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { isArrayContainsAllTargetElements } from 'src/utils/arrayFunctions';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private requiredPermissions: string[]) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      //throw new UnauthorizedException();
      console.log('no user');
      return false;
    }
    if (
      isArrayContainsAllTargetElements(
        request.user.permissions,
        this.requiredPermissions,
      )
    )
      return true;
    return false;
  }
}
