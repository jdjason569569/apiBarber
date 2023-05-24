import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:"*",
    });
  await app.listen(3000);
  console.log('barber api in 3000');
  
}
bootstrap();
