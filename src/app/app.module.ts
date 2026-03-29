import { Module } from '@nestjs/common';

import { ClientsModule } from 'src/modules/clients/clients.module';
import { OrdersModule } from 'src/modules/orders/orders.module';
import { ProductsModule } from 'src/modules/products/products.module';

@Module({
  imports: [ClientsModule, OrdersModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
