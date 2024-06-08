import { IsString, IsUUID } from 'class-validator';

export class CreateBankingInformationDto {
  @IsUUID()
  id: string;

  @IsString()
  iban: string;

  @IsUUID()
  userId: string;
}
