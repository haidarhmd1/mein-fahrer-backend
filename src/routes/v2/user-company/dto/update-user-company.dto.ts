import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserCompanyDto } from './create-user-company.dto';
import { IsUUID, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class UpdateUserCompanyDto extends PartialType(CreateUserCompanyDto) {
  @ApiProperty({
    description: 'ID of the user associated with the user company',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  userId: string;

  @ApiProperty({
    description: 'ID of the company associated with the user company',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  companyId: string;

  @ApiProperty({
    description: 'Flag indicating if the user is active in the company',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isUserActive?: boolean;

  @ApiProperty({
    description:
      'Start date of the users association with the company (Unix timestamp)',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  start_date: number;

  @ApiProperty({
    description:
      'End date of the users association with the company (Unix timestamp)',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  end_date?: number;
}
