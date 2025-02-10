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
      origin: 'http://localhost:5173', // Local frontend URL
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  } else {
    // Allow requests only from production frontend

    app.enableCors({
      origin: [
        'https://skill-level3.vercel.app',
        'https://skill-level3-git-main-sergueis-projects-5c54ca99.vercel.app',
        'https://skill-level3-88zrp7t3g-sergueis-projects-5c54ca99.vercel.app'
      ], // Vercel frontend URL
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'Origin',
        'X-Requested-With'
      ],
      maxAge: 3600,
    });
  }

  const port = process.env.PORT || 3001; // Use Render's PORT or default to 3001
  await app.listen(port, () => {
    console.log(`Application running on http://localhost:${port}`);
  });
}
bootstrap();
