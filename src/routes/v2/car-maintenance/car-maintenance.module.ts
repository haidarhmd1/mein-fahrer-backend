import { Module } from '@nestjs/common';
import { CarMaintenanceService } from './car-maintenance.service';
import { CarMaintenanceController } from './car-maintenance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarMaintenance } from './entities/car-maintenance.entity';
import { CarsModule } from '../cars/cars.module';

@Module({
  imports: [TypeOrmModule.forFeature([CarMaintenance]), CarsModule],
  controllers: [CarMaintenanceController],
  providers: [CarMaintenanceService],
})
export class CarMaintenanceModule {}
