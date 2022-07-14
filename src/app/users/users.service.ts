import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { makeSalt, encryptPassword } from 'src/utils/crypto';
import { UsersDocument } from '@mongo/entities/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private userModel: Model<UsersDocument>) {}

  // 查找邮箱是否已经存在
  async find(email: string): Promise<UsersDocument | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  // 注册新用户
  async register(body: ISignin): Promise<ISigninRes> {
    const { password, email } = body;
    const user = await this.find(email);

    if (user)
      return {
        status: 301,
        message: '邮箱已被注册',
        timestamp: new Date().getTime(),
      };

    const salt = makeSalt();
    const hashPwd = encryptPassword(password, salt);

    await this.userModel.create({ email, password: hashPwd });

    return {
      status: 200,
      message: '注册成功',
      timestamp: new Date().getTime(),
    };
  }
}
