import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Import fs
import * as fs from 'fs';

// Create folder /cloud if it doesn't exist
if (!fs.existsSync('./cloud')) {
  fs.mkdirSync('./cloud');
}

// Create folder /cloud/images if it doesn't exist
if (!fs.existsSync('./cloud/images')) {
  fs.mkdirSync('./cloud/images');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(9050);
}
bootstrap();
