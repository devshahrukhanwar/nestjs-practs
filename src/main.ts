import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  // Initialize the database connection
  await AppDataSource.initialize()
    .then(() => {
      console.log('Database connection established');
    })
    .catch((error) => {
      console.error('Database connection error:', error);
      process.exit(1);
    });

  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
