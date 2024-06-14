import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsUUID,
  IsEnum,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ShiftType } from 'src/common/types/shift';

export class PlaceOfShiftStart {
  @ApiProperty({ description: 'Latitude of the shift start location' })
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  latitude: number;

  @ApiProperty({ description: 'Longitude of the shift start location' })
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
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
    example: 1718351982,
  })
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  date_and_time_start: number;

  @ApiProperty({
    description: 'Date and time when the shift ends (Unix timestamp)',
    example: 1718351982,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  date_and_time_end: number;

  @ApiProperty({ description: 'Starting kilometers of the shift', example: 75 })
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  km_start: number;

  @ApiProperty({
    description: 'Ending kilometers of the shift',
    example: 150,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  km_end: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Pictures taken at the beginning of the shift',
  })
  pictures_shift_start: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Pictures taken at the end of the shift',
    required: false,
  })
  @IsOptional()
  pictures_shift_end: string;

  @ApiProperty({
    description: 'Location information of the shift start',
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PlaceOfShiftStart)
  place_of_shift_start: PlaceOfShiftStart;

  @ApiProperty({
    description: 'Type of the shift (day/night)',
    example: ShiftType.DAY,
  })
  @IsEnum(ShiftType)
  shift_type: ShiftType;
}
