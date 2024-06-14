import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsPhoneNumber, IsEnum } from 'class-validator';
import { GenderRole, FamilyStatus, UserRole } from 'src/common/types/user';

export class UpdateUserDto {
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
    required: false,
    description: 'Avatar / profile picture of the user',
  })
  @IsOptional()
  user_avatar: string;

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

  @ApiProperty({
    description: 'Gender of the user',
    required: false,
    enum: GenderRole,
    example: GenderRole.MALE,
  })
  @IsEnum(GenderRole)
  @IsOptional()
  gender: GenderRole;

  @ApiProperty({
    description: 'Family status of the user',
    required: false,
    enum: FamilyStatus,
    example: FamilyStatus.SINGLE,
  })
  @IsOptional()
  @IsEnum(FamilyStatus)
  familyStatus: FamilyStatus;

  @ApiProperty({
    description: 'Role of the user',
    required: false,
    enum: UserRole,
    example: UserRole.USER,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
