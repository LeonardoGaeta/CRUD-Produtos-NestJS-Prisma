import { IsNumber, IsString } from "class-validator";


export class CreateProductDto {
    
    @IsString()
    nome: string;
    
    @IsString()
    marca: string;

    @IsNumber({
        maxDecimalPlaces: 2
    }, {
        message: "Insira um valor válido!"
    })
    precoC: number;
    
    @IsNumber({
        maxDecimalPlaces: 2
    }, {
        message: "Insira um valor válido!"
    })
    precoV: number;
}
