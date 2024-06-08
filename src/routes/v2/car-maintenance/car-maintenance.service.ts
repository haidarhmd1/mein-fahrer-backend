import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarMaintenance } from './entities/car-maintenance.entity';
import { CreateCarMaintenanceDto } from './dto/create-car-maintenance.dto';
import { UpdateCarMaintenanceDto } from './dto/update-car-maintenance.dto';
import { CarsService } from '../cars/cars.service';

@Injectable()
export class CarMaintenanceService {
  constructor(
    @InjectRepository(CarMaintenance)
    private readonly carMaintenanceRepository: Repository<CarMaintenance>,
    private readonly carsService: CarsService,
  ) {}

  async create(
    carId: string,
    createCarMaintenanceDto: CreateCarMaintenanceDto,
  ): Promise<CarMaintenance> {
    const car = await this.carsService.findOne(carId);
    if (!car) {
      throw new NotFoundException(`Car with ID "${carId}" not found`);
    }

    const carMaintenance = this.carMaintenanceRepository.create({
      ...createCarMaintenanceDto,
      car,
    });
    return this.carMaintenanceRepository.save(carMaintenance);
  }

  async findAll(carId: string): Promise<CarMaintenance[]> {
    return this.carMaintenanceRepository.find({
      where: { car: { id: carId } },
    });
  }

  async findOne(carId: string, id: string): Promise<CarMaintenance> {
    const carMaintenance = await this.carMaintenanceRepository.findOne({
      where: { id, car: { id: carId } },
    });
    if (!carMaintenance) {
      throw new NotFoundException(
        `CarMaintenance with ID "${id}" for Car "${carId}" not found`,
      );
    }
    return carMaintenance;
  }

  async update(
    carId: string,
    id: string,
    updateCarMaintenanceDto: UpdateCarMaintenanceDto,
  ): Promise<CarMaintenance> {
    const carMaintenance = await this.carMaintenanceRepository.preload({
      id,
      car: { id: carId },
      ...updateCarMaintenanceDto,
    });
    if (!carMaintenance) {
      throw new NotFoundException(
        `CarMaintenance with ID "${id}" for Car "${carId}" not found`,
      );
    }
    return this.carMaintenanceRepository.save(carMaintenance);
  }

  async remove(carId: string, id: string): Promise<void> {
    const carMaintenance = await this.findOne(carId, id);
    await this.carMaintenanceRepository.remove(carMaintenance);
  }
}
