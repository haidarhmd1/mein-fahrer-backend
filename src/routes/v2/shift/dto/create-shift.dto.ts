import {
  IsNumber,
  IsString,
  IsUUID,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ShiftType } from 'src/common/types/shift';

class PlaceOfShiftStart {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  address: string;
}

export class CreateShiftDto {
  @IsUUID()
  userCompanyId: string;

  @IsUUID()
  carId: string;

  @IsNumber()
  @Type(() => Number)
  date_and_time_start: number;

  @IsNumber()
  @Type(() => Number)
  date_and_time_end: number;

  @IsNumber()
  km_start: number;

  @IsNumber()
  km_end: number;

  @IsString()
  pictures_shift_start: string;

  @IsString()
  pictures_shift_end: string;

  @ValidateNested()
  @Type(() => PlaceOfShiftStart)
  place_of_shift_start: PlaceOfShiftStart;

  @IsEnum(ShiftType)
  shift_type: ShiftType;
}
