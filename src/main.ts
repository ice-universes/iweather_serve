import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const port = parseInt(process.env.PORT);

  await app.listen(isNaN(port) ? 3000 : port);
}

bootstrap();
