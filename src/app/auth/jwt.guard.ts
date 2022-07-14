import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw (
        err ??
        new UnauthorizedException({
          status: HttpStatus.UNAUTHORIZED,
          message: '账号未登录',
          timestamp: new Date().getTime(),
        })
      );
    }
    return user;
  }
}
