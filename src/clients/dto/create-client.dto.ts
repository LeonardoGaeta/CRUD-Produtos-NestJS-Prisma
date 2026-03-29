import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateClientDto {
  @IsString({
    message: 'O nome deve ser um texto!',
  })
  @MaxLength(128, {
    message: 'O nome deve ter menos de 128 caracteres!',
  })
  nome: string;

  @IsNotEmpty({
    message: 'Insira um email por favor!',
  })
  @IsEmail(
    {},
    {
      message: 'Insira um email válido.',
    },
  )
  email: string;
}
