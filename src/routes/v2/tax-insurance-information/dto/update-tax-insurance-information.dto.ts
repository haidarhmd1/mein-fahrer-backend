import { PartialType } from '@nestjs/swagger';
import { CreateTaxInsuranceInformationDto } from './create-tax-insurance-information.dto';

export class UpdateTaxInsuranceInformationDto extends PartialType(CreateTaxInsuranceInformationDto) {}
