import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '@app/users/users.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly user: UsersService
  ) {}

  async sendEmailCode(data: IMailBody) {
    try {
      const code = Math.random().toString().slice(-6);
      const date = new Date().toString();
      const { email, subject, sign } = data;

      const sendMailOptions: ISendMailOptions = {
        to: email,
        subject: subject ?? '小冰天气验证码',
        template: 'validate.code.ejs',
        context: {
          code, // 验证码
          date, // 日期
          sign: sign ?? '系统邮件, 回复无效',
        },
      };

      return this.mailerService
        .sendMail(sendMailOptions)
        .then(() => {
          this.user.saveCode(code, email);

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
