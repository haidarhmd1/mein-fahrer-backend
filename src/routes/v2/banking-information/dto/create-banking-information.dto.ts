import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateBankingInformationDto {
  @ApiProperty({
    description: 'Unique identifier for the banking information',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'IBAN of the banking information',
    example: 'DE89370400440532013000',
  })
  @IsString()
  iban: string;

  @ApiProperty({
    description: 'User ID associated with the banking information',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsUUID()
  userId: string;
}
