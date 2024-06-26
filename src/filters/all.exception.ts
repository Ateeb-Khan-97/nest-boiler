import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MyLogger } from 'src/modules/logger/logger.service';
import { ResponseMapper } from 'src/shared/mappers/Response.mapper';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const logger = new MyLogger();
    logger.setContext(exception['name']);
    logger.error(exception['message']);

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const response = exception?.response;
    let message = 'Error';
    if (response) {
      if (typeof response != 'string') message = response?.message || 'Error';
      if (Array.isArray(response.message)) message = response.message[0];
    }

    httpAdapter.reply(
      ctx.getResponse(),
      ResponseMapper.map({
        message,
        status: httpStatus,
      }),
      httpStatus,
    );
  }
}
