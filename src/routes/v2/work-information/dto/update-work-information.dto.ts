import { PartialType } from '@nestjs/swagger';
import { CreateWorkInformationDto } from './create-work-information.dto';

export class UpdateWorkInformationDto extends PartialType(CreateWorkInformationDto) {}
