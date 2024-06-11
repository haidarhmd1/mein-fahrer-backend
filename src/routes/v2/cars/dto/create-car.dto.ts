import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({
    description: 'Unique identifier for the car',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  companyId: string;

  @ApiProperty({
    description: 'License plate of the car',
    example: 'AB-1234',
  })
  @IsString()
  license_plate: string;

  @ApiProperty({
    description: 'VIN (Vehicle Identification Number) of the car',
    example: 'WBA4Z5C54JEA24329',
  })
  @IsString()
  VIN: string;

  @ApiProperty({
    description: 'HSN (Herstellerschlüsselnummer) of the car',
    example: '0583',
  })
  @IsString()
  HSN: string;

  @ApiProperty({
    description: 'TSN (Typschlüsselnummer) of the car',
    example: 'AFD',
  })
  @IsString()
  TSN: string;

  @ApiProperty({
    description: 'Brand of the car',
    example: 'BMW',
  })
  @IsString()
  brand: string;

  @ApiProperty({
    description: 'Model of the car',
    example: 'X5',
  })
  @IsString()
  model: string;

  @ApiProperty({
    description: 'Year of production of the car',
    example: '2020',
  })
  @IsString()
  year_of_production: string;

  @ApiProperty({
    description: 'Color of the car',
    example: 'Black',
  })
  @IsString()
  color: string;

  @ApiProperty({
    description: 'Date of last Eichung inspection',
    example: 1623392788000,
  })
  @IsNumber()
  date_eichung_last: number;

  @ApiProperty({
    description: 'Date of last TUV inspection',
    example: 1623392788000,
  })
  @IsNumber()
  date_Tuv_last: number;

  @ApiProperty({
    description: 'Date of next Eichung inspection',
    example: 1623392788000,
  })
  @IsNumber()
  date_eichung_next: number;

  @ApiProperty({
    description: 'Date of next TUV inspection',
    example: 1623392788000,
  })
  @IsNumber()
  date_Tuv_next: number;

  @ApiProperty({
    description: 'Insurance number of the car',
    example: '123456789',
  })
  @IsString()
  insurance_nr: string;

  @ApiProperty({
    description: 'Oil change interval of the car',
    example: 10000,
  })
  @IsNumber()
  oil_change_interval: number;

  @ApiProperty({
    description: 'Concession number of the car',
    example: 'CON-1234',
  })
  @IsString()
  concession_number: string;

  @ApiProperty({
    description: 'Tire size of the car',
    example: '225/45R17',
  })
  @IsString()
  tire_size: string;
}
