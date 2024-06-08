import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateCarDto {
  @IsUUID()
  companyId: string;

  @IsString()
  license_plate: string;

  @IsString()
  VIN: string;

  @IsString()
  HSN: string;

  @IsString()
  TSN: string;

  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsString()
  year_of_production: string;

  @IsString()
  color: string;

  @IsNumber()
  date_eichung_last: number;

  @IsNumber()
  date_Tuv_last: number;

  @IsNumber()
  date_eichung_next: number;

  @IsNumber()
  date_Tuv_next: number;

  @IsString()
  insurance_nr: string;

  @IsNumber()
  oil_change_interval: number;

  @IsString()
  concession_number: string;

  @IsString()
  tire_size: string;
}
