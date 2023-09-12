import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { AppModule } from './app.module';
import * as path from 'path';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.useStaticAssets(path.resolve(__dirname, '..', 'public'));
  app.setBaseViewsDir(path.resolve(__dirname, '..', 'views'));
  app.setViewEngine(hbs);

  await app.listen(3000);
}
bootstrap();
