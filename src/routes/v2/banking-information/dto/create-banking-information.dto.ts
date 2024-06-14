import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBankingInformationDto {
  @ApiProperty({
    description: 'IBAN of the banking information',
    example: 'DE89370400440532013000',
  })
  @IsString()
  iban: string;
}
