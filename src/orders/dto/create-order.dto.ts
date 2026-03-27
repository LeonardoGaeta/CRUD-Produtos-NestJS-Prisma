import { IsNumber } from "class-validator";

export class CreateOrderDto {

    @IsNumber({
        maxDecimalPlaces: 2
    }, {
        message: "Insira um valor válido!"
    })
    precoTotal:     number;

    @IsNumber({}, {
        message: "Insira um ID válido"
    })
    idClient:       number;
}
