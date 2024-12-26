main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Permite todas as origens (modifique para maior segurança)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Se necessário enviar cookies ou headers de autenticação
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
