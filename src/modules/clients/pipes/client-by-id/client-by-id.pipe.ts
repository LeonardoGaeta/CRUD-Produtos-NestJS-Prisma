import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientByIdPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(id: number) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }

    return client;
  }
}
