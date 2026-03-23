import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from 'src/clients/clients.module';
import { OrderProductModule } from 'src/order-product/order-product.module';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ClientsModule, 
            OrderProductModule, 
            OrdersModule, 
            ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
