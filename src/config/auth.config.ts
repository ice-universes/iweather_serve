import { registerAs } from '@nestjs/config';

export default registerAs(
  'auth',
  (): IAuthConfig => ({
    secret: process.env.AUTHORIZATION ?? 'ice-weather',
    expires: process.env.EXPIRES ?? '356d', // 过期时间
  })
);
