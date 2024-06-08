import { IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateCarMaintenanceDto {
  @IsOptional()
  @IsNumber()
  km: number;

  @IsOptional()
  @IsNumber()
  km_date: number;

  @IsOptional()
  @IsNumber()
  date_last_oil_change: number;

  @IsOptional()
  @IsNumber()
  date_next_oil_change: number;

  @IsOptional()
  @IsNumber()
  km_last_oil_change: number;

  @IsOptional()
  @IsNumber()
  km_next_oil_change: number;

  @IsOptional()
  @IsString()
  tire_type: string;

  @IsOptional()
  @IsString()
  tire_manufacturer: string;
}
