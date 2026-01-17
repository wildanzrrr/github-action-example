import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../package.json';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('MAIN');
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['error', 'log', 'debug'],
  });

  // CORS Option
  const options: CorsOptions = {
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
  };
  app.enableCors(options);

  // Helmet middleware
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
      hsts: {
        maxAge: 1 * 60 * 60 * 24 * 365, // 1 year
        includeSubDomains: true,
        preload: true,
      },
    }),
  );

  // Validation Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('FLOW Africa Strategy')
    .setDescription('FLOW API documentation and playground')
    .setVersion(version)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  const PORT =
    process.env.NODE_ENV === 'production' ? 3000 : process.env.PORT || 3000;
  await app.listen(PORT, () => {
    logger.log(`Server is running on port: ${PORT}`);
  });
}

void bootstrap();
