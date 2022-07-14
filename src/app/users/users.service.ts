import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { makeSalt, encryptPassword } from 'src/utils/crypto';
import { UsersDocument } from '@mongo/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private userModel: Model<UsersDocument>) {}

  // 查找邮箱是否已经存在
  async findOne(email: string): Promise<UsersDocument | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  // 注册新用户
  async register(body: IAuth): Promise<ISigninRes> {
    const { password, email } = body;
    const user = await this.findOne(email);

    if (user)
      return {
        status: 301,
        message: '邮箱已被注册',
        timestamp: new Date().getTime(),
      };

    const salt = makeSalt();
    const hashPwd = encryptPassword(password, salt);

    await this.userModel.create({ email, password: hashPwd, salt });

    return {
      status: 200,
      message: '注册成功',
      timestamp: new Date().getTime(),
    };
  }
}
