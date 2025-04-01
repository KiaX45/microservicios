import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); //basicamente, adiciona o prefixo 'api' a todas as rutas
  //Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Server Microservices')
    .setDescription('Server Microservices API')
    .setVersion('1.0')
    .addTag('microservices')
    .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

  
  app.useGlobalPipes( 
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
   );
   
  await app.listen(envs.port ?? 3000);

  console.log(`Server running on port ${envs.port}`)
}
bootstrap();
