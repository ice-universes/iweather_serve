import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@app/auth/auth.module';
import { UsersModule } from '@app/users/users.module';

// 配置文件
import databaseConfig from '@src/config/database.config';
import authConfig from '@src/config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const db = configService.get<IDataBaseConfig>('database');

        const { host, port, dbName, userName, password } = db;

        let admin = '';
        if (userName && password) {
          admin = `${userName}:${password}@`;
        }

        return {
          uri: `mongodb://${admin}${host}:${port}/${dbName}`,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
