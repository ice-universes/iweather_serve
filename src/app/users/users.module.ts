import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '@app/auth/auth.module';
import { UsersSchema } from '@mongo/users.schema';
import { FavoritesSchema } from '@mongo/favorites.schema';

// 查询用户信息相关模块
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'users', schema: UsersSchema },
      { name: 'favorites', schema: FavoritesSchema },
    ]),
    // 模块的循环依赖
    // docs: https://docs.nestjs.com/fundamentals/circular-dependency
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
