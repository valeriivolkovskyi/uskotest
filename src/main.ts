import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppErrorFilter } from '../AppErrorFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AppErrorFilter())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
