import { IsUUID, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateUserCompanyDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  companyId: string;

  @IsBoolean()
  @IsOptional()
  isUserActive?: boolean;

  @IsNumber()
  start_date: number;

  @IsNumber()
  @IsOptional()
  end_date?: number;
}
