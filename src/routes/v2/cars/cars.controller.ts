import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CompanyService } from '../company/company.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly companyService: CompanyService,
  ) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    const { companyId } = createCarDto;
    const company = await this.companyService.findOne(companyId);
    return await this.carsService.create(createCarDto, company);
  }

  @Get()
  async findAll() {
    return await this.carsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.carsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    const car = await this.carsService.findOne(id);
    if (!car) {
      throw new NotFoundException('Car not found');
    }

    const { companyId } = updateCarDto;

    let company = null;
    if (companyId) {
      company = await this.companyService.findOne(companyId);
      if (!company) {
        throw new NotFoundException(`Company with ID "${companyId}" not found`);
      }
    }

    return await this.carsService.update(id, updateCarDto, company);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.carsService.remove(id);
  }
}
