import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CompanyDto {
  id: number;
  created_at: number;
  name: string;
  active: boolean;
  admin_email: string;
}

export class XanoUserResponseDto {
  id: number;
  first_name: string;
  last_name: string;
  companys_id: number;
  onesignal_identifier: string[];
  email: string;
  _company: CompanyDto;
}

export class XanoNotificationDispatcherDto {
  id: number;
  created_at: number;
  driver_first_name: string;
  driver_id: number;
  companys_id: number;
  pickup: string;
  destination: string;
  price: string;
  distance: string;
}

export class XanoRequestBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  unternehmen: string;

  @ApiProperty()
  @IsNotEmpty()
  preis: string;

  @ApiProperty()
  @IsNotEmpty()
  abholadresse: string;

  @ApiProperty()
  @IsNotEmpty()
  zieladresse: string;

  @ApiProperty()
  @IsNotEmpty()
  entfernung: string;

  @ApiProperty()
  @IsNotEmpty()
  fahrer: string;
}

export class XanoUserResponseArrayDto extends Array<XanoUserResponseDto> {}
