import { registerAs } from '@nestjs/config';

export default registerAs(
  'mail',
  (): IMailConfig => ({
    host: process.env.MAIL_HOST ?? 'smtp.exmail.qq.com',
    port: parseInt(process.env.MAIL_PORT ?? '465'),
    account: process.env.MAIL_ACCOUNT,
    password: process.env.MAIL_PASSWORD,
  })
);
