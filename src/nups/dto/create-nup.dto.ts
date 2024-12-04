import { IsNotEmpty, IsBoolean } from 'class-validator'

export class CreateNupDto {
  @IsNotEmpty()
  nup: string;

  @IsNotEmpty()
  orgaoJulgador: string;

  @IsNotEmpty()
  @IsBoolean()
  cadastrado: boolean;
}


