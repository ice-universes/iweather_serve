import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '@app/auth/jwt.guard';
import { Request } from 'express';

interface Request_ extends Request {
  user: IPayLoad;
}

@Controller()
export class UsersController {
  constructor(
    private readonly user: UsersService,
    private readonly auth: AuthService
  ) {}

  @Post('signin')
  async register(@Body() body: IAuth) {
    return await this.user.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  async favorites(@Req() req: Request_) {
    const {
      user: { uid },
    } = req;
    return await this.user.favorite(uid);
  }

  @UseGuards(JwtAuthGuard)
  @Post('addFavorites')
  async addFavorites(@Req() req: Request_, @Body() body: IFavorites) {
    const {
      user: { uid },
    } = req;
    return await this.user.addFavorite({ uid, item: body });
  }

  @UseGuards(JwtAuthGuard)
  @Post('deleteFavorites')
  async deleteFavorites(@Req() req: Request_, @Body() body: IFavorites) {
    const {
      user: { uid },
    } = req;
    return await this.user.deleteFavorites({ uid, item: body });
  }

  @Post('login')
  async login(@Body() body: IAuth) {
    const { email, password } = body;
    const { code, user } = await this.auth.validateUser(email, password);

    switch (code) {
      case 1:
        return {
          status: 200,
          token: this.auth.certificate(user),
          timestamp: new Date().getTime(),
          message: '登录成功',
        };
      case 2:
        return {
          status: 302,
          timestamp: new Date().getTime(),
          message: '密码错误',
        };
      case 3:
        return {
          status: 303,
          timestamp: new Date().getTime(),
          message: '账号不存在',
        };
    }
  }
}
