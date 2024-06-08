import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsOptional,
  IsUUID,
  IsEnum,
  IsString,
} from 'class-validator';
import { FamilyStatus, GenderRole, UserRole } from 'src/common/types/user';

export class CreateUserDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString({ each: true })
  onesignal_identifier?: string[];

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  dob?: string;

  @IsOptional()
  @IsString()
  placeOfBirth?: string;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(GenderRole)
  gender: GenderRole;

  @IsEnum(FamilyStatus)
  familyStatus: FamilyStatus;

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsUUID()
  workInformationId?: string;

  @IsOptional()
  @IsUUID()
  bankingInformationId?: string;

  @IsOptional()
  @IsUUID()
  drivingLicenseInformationId?: string;

  @IsOptional()
  @IsUUID()
  taxInsuranceInformationId?: string;

  @IsOptional()
  @IsUUID()
  carMaintenanceId?: string;
}
