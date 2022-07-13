import { Controller, Get, Inject } from '@nestjs/common';
// import { UsersService } from './app.service';

@Controller()
export class UsersController {
  constructor(@Inject('ABC') private readonly abc: string) {}

  @Get('/test')
  getAllUsers(): string {
    return this.abc;
  }
}
