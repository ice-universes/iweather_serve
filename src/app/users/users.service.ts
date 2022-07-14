import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { makeSalt, encryptPassword } from 'src/utils/crypto';
import { UsersDocument } from '@mongo/users.schema';
import { FavoritesDocument } from '@mongo/favorites.schema';
import { CalendarDocument } from '@mongo/calendar.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users') private userModel: Model<UsersDocument>,
    @InjectModel('favorites') private favModel: Model<FavoritesDocument>,
    @InjectModel('calendar') private cldModel: Model<CalendarDocument>
  ) {}

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
      status: HttpStatus.OK,
      message: '注册成功',
      timestamp: new Date().getTime(),
    };
  }

  // 获取用户收藏
  async favorite(uid: string): Promise<IFavoritesRes> {
    const res = await this.favModel.findOne({ _id: uid }).exec();

    return {
      status: HttpStatus.OK,
      favorites: res ? res.list : [],
      timestamp: new Date().getTime(),
    };
  }

  // 添加收藏
  async addFavorite(body: {
    uid: string;
    item: IFavorites;
  }): Promise<IFavoritesRes> {
    const { uid, item } = body;

    const res = await this.favModel.findByIdAndUpdate(
      uid,
      { $addToSet: { list: item } }, // 元素不存在时添加
      {
        new: true, // res 是添加新值后的
        upsert: true, // id 不存在就加入
      }
    );

    return {
      status: HttpStatus.OK,
      favorites: res.list,
      timestamp: new Date().getTime(),
    };
  }

  // 删除收藏
  async deleteFavorites(body: {
    uid: string;
    item: IFavorites;
  }): Promise<IFavoritesRes> {
    const { uid, item } = body;

    const res = await this.favModel.findByIdAndUpdate(
      uid,
      { $pull: { list: item } },
      {
        new: true,
      }
    );

    return {
      status: HttpStatus.OK,
      favorites: res.list,
      timestamp: new Date().getTime(),
    };
  }

  // 打卡
  async checkin(body: { uid: string; item: ICheckIn }): Promise<ICheckinRes> {
    const { uid, item } = body;

    await this.cldModel.create({ uid, ...item });

    return {
      status: HttpStatus.OK,
      message: '打卡成功',
      timestamp: new Date().getTime(),
    };
  }

  // 获取打卡表
  async calendar(uid: string): Promise<ICalendar> {
    const res = await this.cldModel.find({ uid }).exec();

    return {
      status: HttpStatus.OK,
      list: res
        ? res.map((e: any) => ({
            location: e.location,
            weather: e.weather,
            date: e.createdAt,
            id: e._id,
          }))
        : [],
      timestamp: new Date().getTime(),
    };
  }
}
