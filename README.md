<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## 接口预览
![接口预览.png](https://s1.ax1x.com/2022/07/15/jhqZj0.png)

## 本地开发
### 安装依赖

```bash
pnpm install
```

### 运行

根目录下新建 .env, 填写
```
MONGODB_URI=xxx # mongodb 地址

SECRET=ice-weather # jwt 密钥

EXPIRES=365d # token 过期时间, 默认 365d

# 以下用于发送验证码

MAIL_HOST=xxx # 邮箱服务器地址

MAIL_PORT=xxx # 服务器端口

MAIL_ACCOUNT=xxx # 邮箱账号

MAIL_PASSWORD=xxx # 邮箱密码
```

关于邮箱, 这里可以采用腾讯企业邮箱(不写 host 的话默认腾讯企业邮箱)

注意不是 qq 邮箱呀 （  ´д｀）ゞ

![jhqxPJ.png](https://s1.ax1x.com/2022/07/15/jhqxPJ.png)

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

### 测试

```bash
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# test coverage
pnpm run test:cov
```
## heroku 部署

heroku 官网: [点击进入](https://dashboard.heroku.com/)


## License

Nest is [MIT licensed](LICENSE).
