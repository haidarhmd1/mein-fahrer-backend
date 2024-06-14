import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, ValidateNested, IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ShiftType } from 'src/common/types/shift';
import { PlaceOfShiftStart } from './create-shift.dto';

export class UpdateShiftDto {
  @ApiProperty({
    description: 'Date and time when the shift starts (Unix timestamp)',
    example: 1718351982,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? parseInt(value) : value))
  date_and_time_start: number;

  @ApiProperty({
    description: 'Date and time when the shift ends (Unix timestamp)',
    example: 1718351982,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? parseInt(value) : value))
  date_and_time_end: number;

  @ApiProperty({
    description: 'Starting kilometers of the shift',
    example: 150,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? parseInt(value) : value))
  km_start: number;

  @ApiProperty({
    description: 'Ending kilometers of the shift',
    example: 375,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? parseInt(value) : value))
  km_end: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Pictures taken at the beginning of the shift',
    required: false,
  })
  @IsOptional()
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
  @ValidateNested()
  @IsOptional()
  place_of_shift_start: PlaceOfShiftStart;

  @ApiProperty({
    description: 'Type of the shift (day/night)',
    example: ShiftType.DAY,
    required: false,
  })
  @IsEnum(ShiftType)
  shift_type: ShiftType;
}
