import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'Latitude of the shift start location' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Longitude of the shift start location' })
  @IsNumber()
  longitude: number;

  @ApiProperty({ description: 'Address of the shift start location' })
  @IsString()
  address: string;
}

export class CreateShiftDto {
  @ApiProperty({
    description: 'ID of the user company associated with the shift',
  })
  @IsUUID()
  userCompanyId: string;

  @ApiProperty({ description: 'ID of the car associated with the shift' })
  @IsUUID()
  carId: string;

  @ApiProperty({
    description: 'Date and time when the shift starts (Unix timestamp)',
  })
  @IsNumber()
  @Type(() => Number)
  date_and_time_start: number;

  @ApiProperty({
    description: 'Date and time when the shift ends (Unix timestamp)',
  })
  @IsNumber()
  @Type(() => Number)
  date_and_time_end: number;

  @ApiProperty({ description: 'Starting kilometers of the shift' })
  @IsNumber()
  km_start: number;

  @ApiProperty({ description: 'Ending kilometers of the shift' })
  @IsNumber()
  km_end: number;

  @ApiProperty({ description: 'Pictures taken at the beginning of the shift' })
  @IsString()
  pictures_shift_start: string;

  @ApiProperty({ description: 'Pictures taken at the end of the shift' })
  @IsString()
  pictures_shift_end: string;

  @ApiProperty({ description: 'Location information of the shift start' })
  @ValidateNested()
  @Type(() => PlaceOfShiftStart)
  place_of_shift_start: PlaceOfShiftStart;

  @ApiProperty({ description: 'Type of the shift (e.g., Regular, Overtime)' })
  @IsEnum(ShiftType)
  shift_type: ShiftType;
}
