import { PartialType } from '@nestjs/swagger';
import { CreateCarMaintenanceDto } from './create-car-maintenance.dto';

export class UpdateCarMaintenanceDto extends PartialType(CreateCarMaintenanceDto) {}
