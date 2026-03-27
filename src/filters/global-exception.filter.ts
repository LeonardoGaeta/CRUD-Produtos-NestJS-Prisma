import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const status =
      (exception instanceof HttpException)
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      (exception instanceof HttpException)
        ? this.extractMessage(exception.getResponse())
        : 'Erro interno do servidor.';

    res.status(status).json({
      success:      false,
      statusCode:   status,
      path:         req.url,
      timestamp:    new Date().toISOString(),
      error: {
        message,
      },
    });
  }

  private extractMessage(response: string | object) {
    if (typeof response === 'string') return response;

    if (typeof response === 'object' && response !== null) {
      const r = response as any;

      if (Array.isArray(r.message)) {
        return r.message.join(', ');
      }

      return r.message || r.error || JSON.stringify(r);
    }

    return 'Erro inesperado';
  }
}
