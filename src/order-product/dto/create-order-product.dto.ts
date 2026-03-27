import { IsNumber } from "class-validator";


export class CreateOrderProductDto {
    
    @IsNumber({}, {
        message: "Insira uma quantidade válida!"
    })
    qtd:            number;

    @IsNumber({
        maxDecimalPlaces: 2,
    }, {
        message: "Insira um valor válido!"
    })
    precoUnit:      number;

    @IsNumber({
        maxDecimalPlaces: 2,
    }, {
        message: "Insira um valor válido!"
    })
    precoTotal:     number;

    @IsNumber({}, {
        message: "Insira um ID válido!"
    })
    orderId:        number;

    @IsNumber({}, {
        message: "Insira um ID válido!"
    })
    productId:      number;
}
