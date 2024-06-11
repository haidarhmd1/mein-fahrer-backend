import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateUserCompanyDto {
  @ApiProperty({
    description: 'ID of the user associated with the user company',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'ID of the company associated with the user company',
  })
  @IsUUID()
  companyId: string;

  @ApiProperty({
    description: 'Flag indicating if the user is active in the company',
  })
  @IsBoolean()
  @IsOptional()
  isUserActive?: boolean;

  @ApiProperty({
    description:
      'Start date of the users association with the company (Unix timestamp)',
  })
  @IsNumber()
  start_date: number;

  @ApiProperty({
    description:
      'End date of the users association with the company (Unix timestamp)',
  })
  @IsNumber()
  @IsOptional()
  end_date?: number;
}
