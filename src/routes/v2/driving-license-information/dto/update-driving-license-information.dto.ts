import { PartialType } from '@nestjs/swagger';
import { CreateDrivingLicenseInformationDto } from './create-driving-license-information.dto';

export class UpdateDrivingLicenseInformationDto extends PartialType(CreateDrivingLicenseInformationDto) {}
