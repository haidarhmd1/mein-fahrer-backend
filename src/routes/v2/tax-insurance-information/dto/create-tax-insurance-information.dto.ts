import { IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaxInsuranceInformationDto {
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
}
