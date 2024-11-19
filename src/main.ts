import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import serverlessExpress from '@vendia/serverless-express';

dotenv.config(); // Load environment variables from .env

// Check the MongoDB URI for debugging
console.log('MongoDB URI:', process.env.MONGODB_URI);

const expressApp = express();

// Serverless handler
let server;

async function createServer() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.enableCors(); // Enable CORS for serverless environments
  await app.init();
  server = serverlessExpress({ app: expressApp });
  return server;
}

export const handler = async (event, context) => {
  if (!server) {
    await createServer();
  }
  return server(event, context);
};

// Local development bootstrap
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for local development
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

// Only call bootstrap for local development
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}
