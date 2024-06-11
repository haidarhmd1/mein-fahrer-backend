import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'First name of the user',
    required: false,
    example: 'John',
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    description: 'Last name of the user',
    required: false,
    example: 'Doe',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    description: 'OneSignal identifiers',
    required: false,
    isArray: true,
    example: ['id1', 'id2'],
  })
  @IsOptional()
  @IsString({ each: true })
  onesignal_identifier?: string[];

  @ApiProperty({
    description: 'Email of the user',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Phone number of the user',
    required: false,
    example: '+1234567890',
  })
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Date of birth of the user',
    required: false,
    example: '1990-01-01',
  })
  @IsOptional()
  @IsString()
  dob?: string;

  @ApiProperty({
    description: 'Place of birth of the user',
    required: false,
    example: 'New York',
  })
  @IsOptional()
  @IsString()
  placeOfBirth?: string;

  @ApiProperty({
    description: 'Nationality of the user',
    required: false,
    example: 'American',
  })
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiProperty({ description: 'Password for the user', example: 'password123' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Gender of the user',
    enum: GenderRole,
    example: GenderRole.MALE,
  })
  @IsEnum(GenderRole)
  gender: GenderRole;

  @ApiProperty({
    description: 'Family status of the user',
    enum: FamilyStatus,
    example: FamilyStatus.SINGLE,
  })
  @IsEnum(FamilyStatus)
  familyStatus: FamilyStatus;

  @ApiProperty({
    description: 'Role of the user',
    enum: UserRole,
    example: UserRole.USER,
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    description: 'Work information ID',
    required: false,
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsOptional()
  @IsUUID()
  workInformationId?: string;

  @ApiProperty({
    description: 'Banking information ID',
    required: false,
    example: '123e4567-e89b-12d3-a456-426614174002',
  })
  @IsOptional()
  @IsUUID()
  bankingInformationId?: string;

  @ApiProperty({
    description: 'Driving license information ID',
    required: false,
    example: '123e4567-e89b-12d3-a456-426614174003',
  })
  @IsOptional()
  @IsUUID()
  drivingLicenseInformationId?: string;

  @ApiProperty({
    description: 'Tax insurance information ID',
    required: false,
    example: '123e4567-e89b-12d3-a456-426614174004',
  })
  @IsOptional()
  @IsUUID()
  taxInsuranceInformationId?: string;

  @ApiProperty({
    description: 'Car maintenance ID',
    required: false,
    example: '123e4567-e89b-12d3-a456-426614174005',
  })
  @IsOptional()
  @IsUUID()
  carMaintenanceId?: string;
}
