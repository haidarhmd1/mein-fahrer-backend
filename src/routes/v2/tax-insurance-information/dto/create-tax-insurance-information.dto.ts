import { IsString, IsUUID, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaxInsuranceInformationDto {
  @ApiProperty({
    description: 'Unique identifier for the tax insurance information',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Tax class', example: 'Class A' })
  @IsString()
  taxClass: string;

  @ApiProperty({ description: 'Tax ID', example: '1234567890' })
  @IsString()
  taxId: string;

  @ApiProperty({ description: 'Insurance number', example: '9876543210' })
  @IsString()
  insuranceNumber: string;

  @ApiProperty({ description: 'Health insurance', example: 'Health Company X' })
  @IsString()
  healthInsurance: string;

  @ApiProperty({ description: 'Health insurance number', example: 'H12345' })
  @IsString()
  healthInsuranceNumber: string;

  @ApiProperty({ description: 'Child allowance', example: true })
  @IsBoolean()
  childAllowance: boolean;

  @ApiProperty({
    description: 'User ID associated with the tax insurance information',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsUUID()
  userId: string;
}
