import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  AppError,
  DomainError,
  InfrastructureError,
  NotFoundError,
  ValidationError,
} from 'common/errors';

@Catch(AppError)
export class AppErrorFilter implements ExceptionFilter {
  catch(exception: AppError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: number;
    if (exception instanceof ValidationError) {
      status = HttpStatus.BAD_REQUEST; // 400
    } else if (exception instanceof NotFoundError) {
      status = HttpStatus.NOT_FOUND; // 404
    } else if (exception instanceof DomainError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY; // 422
    } else if (exception instanceof InfrastructureError) {
      status = HttpStatus.SERVICE_UNAVAILABLE; // 503
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR; // fallback to 500
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
