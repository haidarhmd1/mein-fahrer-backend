import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateCarMaintenanceDto {
  @ApiProperty({
    description: 'Kilometers of the car during maintenance',
    example: 15000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  km: number;

  @ApiProperty({
    description: 'Date of the car during maintenance (UNIX timestamp)',
    example: 1623399494463,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  km_date: number;

  @ApiProperty({
    description: 'Date of the last oil change (UNIX timestamp)',
    example: 1623399494463,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  date_last_oil_change: number;

  @ApiProperty({
    description: 'Date of the next oil change (UNIX timestamp)',
    example: 1623399494463,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  date_next_oil_change: number;

  @ApiProperty({
    description: 'Kilometers of the last oil change',
    example: 14000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  km_last_oil_change: number;

  @ApiProperty({
    description: 'Kilometers of the next oil change',
    example: 18000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  km_next_oil_change: number;

  @ApiProperty({
    description: 'Type of tire',
    example: 'Summer',
    required: false,
  })
  @IsOptional()
  @IsString()
  tire_type: string;

  @ApiProperty({
    description: 'Manufacturer of tire',
    example: 'Michelin',
    required: false,
  })
  @IsOptional()
  @IsString()
  tire_manufacturer: string;
}
