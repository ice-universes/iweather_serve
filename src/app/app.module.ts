import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@app/auth/auth.module';
import { UsersModule } from '@app/users/users.module';
import { MailModule } from '@app/mail/mail.module';

// 配置文件
import databaseConfig from '@src/config/database.config';
import authConfig from '@src/config/auth.config';
import mailConfig from '@src/config/mail.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig, mailConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const db = configService.get<IDataBaseConfig>('database');

        const { uri } = db;

        if (uri) {
          return { uri };
        }

        const { host, port, dbName, userName, password, prefix } = db;

        let admin = '';
        if (userName && password) {
          admin = `${userName}:${password}@`;
        }

        return {
          uri: `${prefix}${admin}${host}:${port}/${dbName}`,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    MailModule,
  ],
})
export class AppModule {}
