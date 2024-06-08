import { IsString, IsUUID, IsBoolean } from 'class-validator';

export class CreateTaxInsuranceInformationDto {
  @IsUUID()
  id: string;

  @IsString()
  taxClass: string;

  @IsString()
  taxId: string;

  @IsString()
  insuranceNumber: string;

  @IsString()
  healthInsurance: string;

  @IsString()
  healthInsuranceNumber: string;

  @IsBoolean()
  childAllowance: boolean;

  @IsUUID()
  userId: string;
}
