import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ConfigModule, ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const configService = app.get<ConfigService>(ConfigService);
  app.use(bodyParser.json({ limit: '500mb' }))
  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true })); // For URL-encoded payloads
  // app.enableCors({
  //   'origin': configService.getOrThrow<string>('cors.allowedOrigin'),
  //   'methods': ['GET', 'POST', 'OPTIONS'],
  //   'credentials': true,
  //   'preflightContinue': true,
  //   'optionsSuccessStatus': 204
  // });
  await app.listen(3000);

}
bootstrap();
