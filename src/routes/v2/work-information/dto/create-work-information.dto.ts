import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateWorkInformationDto {
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Uber identifier',
    type: String,
    example: 'Uber12345',
  })
  identifierUber?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Bolt identifier',
    type: String,
    example: 'Bolt12345',
  })
  identifierBolt?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'FreeNow identifier',
    type: String,
    example: 'FreeNow12345',
  })
  identifierFreeNow?: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Entry date timestamp in Unix format',
    type: Number,
    example: 1622548800, // Example Unix timestamp
  })
  entryDate: number;

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'End of work timestamp in Unix format',
    type: Number,
    example: 1672531199, // Example Unix timestamp
  })
  endOfWork?: number;
}
