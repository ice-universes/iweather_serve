import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailCode(data: IMailBody) {
    try {
      const code = Math.random().toString().slice(-6);
      const date = new Date().toString();
      const sendMailOptions: ISendMailOptions = {
        to: data.email,
        subject: data.subject ?? '小冰天气验证码',
        template: 'validate.code.ejs',
        context: {
          code, // 验证码
          date, // 日期
          sign: data.sign ?? '系统邮件, 回复无效',
        },
      };

      return this.mailerService
        .sendMail(sendMailOptions)
        .then(() => {
          return {
            status: HttpStatus.OK,
            message: '邮件发送成功',
          };
        })
        .catch((error) => {
          return error;
        });
    } catch (error) {
      return error;
    }
  }
}
