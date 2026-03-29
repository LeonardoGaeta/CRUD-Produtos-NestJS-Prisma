import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { idClient, items } = createOrderDto;

    const dbProducts = await this.prisma.product.findMany({
      where: { id: { in: items.map((i) => i.productId) } },
    });

    return await this.prisma.order.create({
      data: {
        client: {
          connect: { id: idClient },
        },
        items: {
          create: items.map((item) => {
            const product = dbProducts.find((p) => p.id === item.productId);

            return {
              product: { connect: { id: item.productId } },
              qtd: item.qtd,
              precoUnit: product?.precoV ?? 0,
            };
          }),
        },
      },
      include: {
        items: true,
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        client: {
          select: { nome: true, email: true },
        },
        items: {
          include: {
            product: {
              select: { nome: true, marca: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.order.findUniqueOrThrow({
      where: { id },
      include: {
        client: true,
        items: {
          include: { product: true },
        },
      },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: {
        idClient: updateOrderDto.idClient,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
