import { ApiProperty } from '@nestjs/swagger';

export class CreateDrivingLicenseInformationDto {
  @ApiProperty({
    description: 'Date of issue for the driving license (Unix timestamp)',
    example: 1718351982, // Example Unix timestamp
  })
  pScheinDate: number;

  @ApiProperty({
    description: 'Driving license number',
    example: 'ABC12345',
  })
  pScheinNumber: string;

  @ApiProperty({
    description: 'Expiration date of the driving license (Unix timestamp)',
    example: 1718351982, // Example Unix timestamp
  })
  pScheinExpireDate: number;
}
