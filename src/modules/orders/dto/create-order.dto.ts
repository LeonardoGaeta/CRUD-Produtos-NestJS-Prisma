import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNumber, Min, ValidateNested } from 'class-validator';

export class OrderProductDto {
  @IsInt({
    message: 'O ID do produto deve ser um número inteiro',
  })
  productId: number;

  @IsInt({
    message: 'A quantidade deve ser um número inteiro',
  })
  @Min(1, {
    message: 'A quantidade mínima é 1',
  })
  qtd: number;
}

export class CreateOrderDto {
  @IsNumber(
    {},
    {
      message: 'Insira um ID válido',
    },
  )
  idClient: number;

  @IsArray({
    message: 'Os items devem ser enviados em uma lista',
  })
  @ValidateNested({ each: true })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Type(() => OrderProductDto)
  items: OrderProductDto[];
}
