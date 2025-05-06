import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message;
    } else if ((exception as any).code === '23505') {
      status = 409;
      const detail = (exception as any).detail as string;
      if (detail.includes('phoneNumber')) {
        message = 'Phone number already exists.';
      } else if (detail.includes('email')) {
        message = 'Email already exists.';
      } else {
        message = 'Duplicate key error.';
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
