<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## 本地开发
### 安装依赖

```bash
pnpm install
```

### 运行

根目录下新建 .env, 填写
```
DATABASE_HOST=xxx # 不写默认 127.0.0.1

DATABASE_PORT=xxx # 不写默认 27017

DATABASE_DB_NAME=xxx # 数据库名

DATABASE_USERNAME=xxx # 数据库账号, 可空

DATABASE_PASSWORD=xxx # 数据库密码, 可空

SECRET=ice-weather # jwt 密钥

EXPIRES=365d # token 超时时间
```

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

## License

Nest is [MIT licensed](LICENSE).
