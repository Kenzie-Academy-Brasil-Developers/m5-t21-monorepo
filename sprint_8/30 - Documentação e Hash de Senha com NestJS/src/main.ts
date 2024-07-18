import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // whitelist: true -> remove todas as chaves que nao estão mapeadas.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('KenzieFy')
    .setDescription('Projeto de Musicas e Bands')
    .setVersion('1.0')
    .addTag('bands')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
