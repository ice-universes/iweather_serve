import { registerAs } from '@nestjs/config';

// 数据库相关配置
export default registerAs('datebase', () => ({
  type: process.env.DATEBASE_TYPE ?? 'mongodb',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: parseInt(process.env.DATABASE_PORT) ?? 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
}));
