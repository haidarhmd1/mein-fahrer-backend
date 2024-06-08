import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { Company } from '../company/entities/company.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto, company: Company): Promise<Car> {
    const car = this.carRepository.create({ ...createCarDto, company });
    return await this.carRepository.save(car);
  }

  async findAll(): Promise<Car[]> {
    return await this.carRepository.find();
  }

  async findOne(id: string): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: { id },
      relations: { company: true },
    });

    if (!car) {
      throw new NotFoundException(`Car with Id ${id} not found`);
    }
    return car;
  }

  async update(
    id: string,
    updateCarDto: UpdateCarDto,
    company: Company,
  ): Promise<Car> {
    const car = await this.findOne(id);
    if (!car) {
      throw new NotFoundException('Car not found');
    }

    Object.assign(car, updateCarDto);

    if (company) {
      car.company = company;
    }

    await this.carRepository.save(car);
    return car;
  }

  async remove(id: string) {
    const result = await this.carRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Car not found');
    }
  }
}
