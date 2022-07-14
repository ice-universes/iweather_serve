import { registerAs } from '@nestjs/config';

export default registerAs(
  'database',
  (): IDataBaseConfig => ({
    host: process.env.DATABASE_HOST ?? '127.0.0.1',
    port: parseInt(process.env.DATABASE_PORT ?? '27017'),
    dbName: process.env.DATABASE_DB_NAME,
    userName: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  })
);
