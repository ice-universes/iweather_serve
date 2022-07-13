import { Injectable } from '@nestjs/common';

export interface User {
  name: string; // 用户姓名
  age: number; // 用户年龄
  gender: string; // 用户性别
}

@Injectable()
export class UsersService {
  getHello(): string {
    return 'hello';
  }
}
