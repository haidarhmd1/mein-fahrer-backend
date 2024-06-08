import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateWorkInformationDto {
  @IsOptional()
  identifierUber: string;

  @IsOptional()
  identifierBolt: string;

  @IsOptional()
  identifierFreeNow: string;

  @IsNotEmpty()
  @IsNumber()
  entryDate: number;

  @IsOptional()
  @IsNumber()
  endOfWork: number;
}
