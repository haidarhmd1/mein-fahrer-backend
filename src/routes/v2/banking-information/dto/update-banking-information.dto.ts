import { PartialType } from '@nestjs/swagger';
import { CreateBankingInformationDto } from './create-banking-information.dto';

export class UpdateBankingInformationDto extends PartialType(CreateBankingInformationDto) {}
