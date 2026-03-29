import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderByIdPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado.`);
    }

    return order;
  }
}
