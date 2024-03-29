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

export class XanoRequestBodyDto {
  @IsNotEmpty()
  unternehmen: string;
  @IsNotEmpty()
  preis: string;
  @IsNotEmpty()
  abholadresse: string;
  @IsNotEmpty()
  zieladresse: string;
  @IsNotEmpty()
  entfernung: string;
  @IsNotEmpty()
  fahrer: string;
}

export class XanoUserResponseArrayDto extends Array<XanoUserResponseDto> {}
