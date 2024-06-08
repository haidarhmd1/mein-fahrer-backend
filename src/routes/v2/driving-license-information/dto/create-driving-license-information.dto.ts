import { IsString, IsUUID, IsNumber } from 'class-validator';

export class CreateDrivingLicenseInformationDto {
  @IsUUID()
  id: string;

  @IsNumber()
  pScheinDate: number;

  @IsString()
  pScheinNumber: string;

  @IsNumber()
  pScheinExpireDate: number;

  @IsUUID()
  userId: string;
}
