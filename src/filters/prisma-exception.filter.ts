import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';

export interface ApiResponse<T = any> {
  success:      boolean;
  statusCode:   number;
  data?:        T;
  error?: {
    message:    string;
    code?:      string;
  };
}

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(
    exception:  Prisma.PrismaClientKnownRequestError,
    host:       ArgumentsHost
  ) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const { status, message } = this.handlePrismaError(exception);

    this.logger.error({
      message:  exception.message,
      code:     exception.code,
      path:     req.url,
      method:   req.method,
      stack:    exception.stack
    });

    res.status(status).json({
      success:     false,
      statusCode:   status,
      path:         req.url,
      method:       req.method,
      timestamp: new Date().toISOString(),
      
      error: {
        code: exception.code,
        message,
      },
    });
  }

  private handlePrismaError(
    exception:    Prisma.PrismaClientKnownRequestError,
  ): { status: number, message: string } {
    switch (exception.code) {
      case 'P2002':
        return {
          status:   HttpStatus.CONFLICT,
          message:  'Conflito com registro já existente com este valor único.',
        };

      case 'P2025':
        return {
          status:   HttpStatus.NOT_FOUND,
          message:  'Registro não encontrado.'
        };

      case 'P2003':
        return {
          status:   HttpStatus.BAD_REQUEST,
          message:  'Violação de chave estrangeira.'
        };
        
      case 'P2014':
        return {
          status:   HttpStatus.BAD_REQUEST,
          message:  'Relação inválida entre entidades.'
        }

      default:
        return {
          status:   HttpStatus.BAD_REQUEST,
          message:  'Erro no banco de dados.'
        }
    }
    
  }
}