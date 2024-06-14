import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsPhoneNumber,
  IsOptional,
  IsEnum,
  IsString,
} from 'class-validator';
import { FamilyStatus, GenderRole, UserRole } from 'src/common/types/user';

export class CreateUserDto {
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
    type: 'string',
    format: 'binary',
    description: 'Avatar / profile picture of the user',
  })
  user_avatar: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'john.doe@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

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
  @IsOptional()
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
}
