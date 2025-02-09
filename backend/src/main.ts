import { AppModule } from "./app.module.js";
import { NestFactory } from "@nestjs/core";
import 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
// Hybrid solution
const server = express();

async function bootstrap() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Determine environment (use environment variable for development or production)
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (isDevelopment) {
    // Allow local requests from frontend during development
    app.enableCors({
      origin: 'http://localhost:3000', // Allow local frontend
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  } else {
    // Allow requests only from production frontend
    app.enableCors({
      origin: 'https://skill-level3-7ripn4abu-sergueis-projects-5c54ca99.vercel.app', // Vercel frontend URL
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  }

  await app.listen(3001, () => {
    console.log('Application running on http://localhost:3001');
  });
}
bootstrap();
