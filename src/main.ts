import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './filters/all.exception';
import fastifyCsrfProtection from '@fastify/csrf-protection';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { SwaggerConfig } from './config/config.interface';
import { GLOBAL_CONFIG } from './config/global.config';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fastifyCookie from '@fastify/cookie';
import fastifyHelmet from '@fastify/helmet';
import fastifyCors from '@fastify/cors';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: ['error', 'warn'] },
  );

  app.setGlobalPrefix(GLOBAL_CONFIG.globalPrefix);

  app.register(fastifyCookie, { secret: '' });
  app.register(fastifyHelmet as any);
  app.register(fastifyCsrfProtection as any, { cookieOpts: { signed: true } });
  app.register(fastifyCors as any, { credentials: true, origin: `*` });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  const configService = app.get<ConfigService>(ConfigService);

  // swagger
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .addBearerAuth(
        {
          description: `Please enter token in following format: Bearer <JWT>`,
          name: 'Authorization',
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header',
        },
        'access-token',
      )
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
  }

  await app.listen(GLOBAL_CONFIG.nest.port, '0.0.0.0');
  const url = await app.getUrl();
  console.log(`[Server]: Listening ${url}`);
}
bootstrap();
