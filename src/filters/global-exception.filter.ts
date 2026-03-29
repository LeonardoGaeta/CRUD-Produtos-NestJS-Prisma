import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const response =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Erro interno do servidor.';

    const message = this.extractMessage(response);

    res.status(status).json({
      success: false,
      statusCode: status,
      path: req.url,
      timestamp: new Date().toISOString(),
      error: {
        message,
      },
    });
  }

  private extractMessage(response: string | object) {
    if (typeof response === 'string') return response;

    const resObj = response as { message?: string | string[] };

    if (Array.isArray(resObj.message)) {
      return resObj.message[0];
    }

    return resObj.message || 'Erro inesperado';
  }
}
