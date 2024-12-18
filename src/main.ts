import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  // Create NestJS application
  const app = await NestFactory.create(AppModule);

  // Access the ConfigService to get environment variables
  const configService = app.get(ConfigService);

  // Optionally set a global prefix (e.g., "/api")
  const globalPrefix = configService.get<string>('API_PREFIX') || 'api';
  app.setGlobalPrefix(globalPrefix);  // This sets the global prefix for the API routes

  // Enable CORS with dynamic configuration (could be more restrictive in production)
  const corsOptions = {
    origin: configService.get<string>('CORS_ORIGIN') || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
    credentials: true,
  };
  app.enableCors(corsOptions);

  // Swagger setup - needs to be configured after global prefix is set
  const config = new DocumentBuilder()
    .setTitle('Stage API Docs')
    .setDescription('API documentation for user, movies, and TV shows')
    .setVersion('1.0')
    .addServer(configService.get<string>('API_URL') || 'http://127.0.0.1:3002', 'Default Server')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Use global validation pipes to automatically transform payloads to DTO types
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Get port from environment variables or default to 3000
  const port = configService.get<number>('PORT') || 3000;

  // Start the application
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
