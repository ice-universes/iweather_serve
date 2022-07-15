import { registerAs } from '@nestjs/config';

export default registerAs(
  'database',
  (): IDataBaseConfig => ({
    uri: process.env.MONGODB_URI,
  })
);
