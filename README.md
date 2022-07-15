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

点击 create new app  
![j417NV.png](https://s1.ax1x.com/2022/07/15/j417NV.png)

按照提示完成部署, 部署结束后进入 settings  
![j41HhT.png](https://s1.ax1x.com/2022/07/15/j41HhT.png)

下拉后添加环境变量  
![j41Oc4.png](https://s1.ax1x.com/2022/07/15/j41Oc4.png)

再次手动部署即可

## 免费的 mongodb 集群

mongodb 官网: [点击进入](https://cloud.mongodb.com/)

注册后按照提示选择一个免费的集群即可

> 不要怪我白嫖怪啊 ˋ( ° ▽、° ) 小项目无人问津, 不打算花钱

## License

Nest is [MIT licensed](LICENSE).
