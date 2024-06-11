import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Name of the company',
    example: 'Example Company',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Address of the company',
    example: '123 Example St, City, Country',
    required: false,
  })
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'Whether the company is active or not',
    example: true,
  })
  @IsNotEmpty()
  active: boolean;
}
