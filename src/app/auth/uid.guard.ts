import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '@app/users/users.service';

// 判断 id 的记录是否属于 uid 用户
@Injectable()
export class UidGuard implements CanActivate {
  constructor(private readonly user: UsersService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const {
      user: { uid },
      body: { id },
    } = request;

    return this.requestHandle(uid, id);
  }

  async requestHandle(uid: string, id: string) {
    if (!id || id.length !== 24) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: '参数错误',
        timestamp: new Date().getTime(),
      });
    }

    const eq = await this.user.dailyEqual(uid, id);

    if (!eq) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        message: '权限不足',
        timestamp: new Date().getTime(),
      });
    }

    return true;
  }
}
