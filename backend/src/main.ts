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

  // Create the NestJS application with the Express adapter
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Completely disable CORS
  app.enableCors({
    origin: '*', // Accept all origins
    methods: 'GET, POST', // Specify allowed methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  });

  // Start the server locally on port 3001
  await app.listen(3001, () => {
    console.log('Application running on http://localhost:3001');
  });
}
bootstrap();
