import { Module } from '@nestjs/common';

import { ClientsModule } from 'src/clients/clients.module';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ClientsModule, OrdersModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
