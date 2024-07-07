import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './Middlewares/loggerMiddlewares';
import {  ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const documentConfig= new DocumentBuilder()
    .setTitle('ecommerce-leonard099')
    .setDescription('Documentacion del trabajo integrador de modulo 4 de la carrera full stack de henry')
    .addBearerAuth()
    .setVersion('1.0.0')
    .build();
  const documentacion = SwaggerModule.createDocument(app,documentConfig)
  SwaggerModule.setup('api',app,documentacion)
  app.useGlobalPipes(new ValidationPipe({whitelist:true})); 
  app.use(loggerMiddleware);
  
  await app.listen(3000);
}
bootstrap();
