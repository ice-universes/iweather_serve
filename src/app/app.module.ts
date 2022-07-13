import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import datebaseConfig from 'config/datebase';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局使用
      load: [datebaseConfig], // 自定义配置文件
    }),
  ],
})
export class AppModule {}
