import { ApiProperty } from '@nestjs/swagger';

export class CreateDrivingLicenseInformationDto {
  @ApiProperty({
    description: 'Unique identifier for the driving license information',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Date of issue for the driving license (Unix timestamp)',
    example: 1623835200, // Example Unix timestamp
  })
  pScheinDate: number;

  @ApiProperty({
    description: 'Driving license number',
    example: 'ABC12345',
  })
  pScheinNumber: string;

  @ApiProperty({
    description: 'Expiration date of the driving license (Unix timestamp)',
    example: 1655376000, // Example Unix timestamp
  })
  pScheinExpireDate: number;

  @ApiProperty({
    description: 'User ID associated with the driving license information',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  userId: string;
}
