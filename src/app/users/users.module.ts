import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from '@mongo/entities/users.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: UsersSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
