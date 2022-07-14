import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly user: UsersService) {}

  @Post('/signin')
  async register(@Body() body: ISignin) {
    return await this.user.register(body);
  }
}
