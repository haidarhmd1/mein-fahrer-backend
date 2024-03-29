import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { appConfig } from '../config/appConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Mein Fahrer App')
    .setDescription('Mein Fahrer App API Docs')
    .setVersion('1.0')
    .addTag('meinfahrer')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  console.log('listening on port:' + appConfig.PORT || 4000);

  await app.listen(appConfig.PORT || 4000);
}
bootstrap();
