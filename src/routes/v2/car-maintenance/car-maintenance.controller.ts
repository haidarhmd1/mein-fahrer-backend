import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CarMaintenanceService } from './car-maintenance.service';
import { CreateCarMaintenanceDto } from './dto/create-car-maintenance.dto';
import { UpdateCarMaintenanceDto } from './dto/update-car-maintenance.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cars/:carId/car-maintenance')
export class CarMaintenanceController {
  constructor(private readonly carMaintenanceService: CarMaintenanceService) {}

  @Post()
  async create(
    @Param('carId') carId: string,
    @Body() createCarMaintenanceDto: CreateCarMaintenanceDto,
  ) {
    return await this.carMaintenanceService.create(
      carId,
      createCarMaintenanceDto,
    );
  }

  @Get()
  async findAll(@Param('carId') carId: string) {
    return await this.carMaintenanceService.findAll(carId);
  }

  @Get(':id')
  async findOne(@Param('carId') carId: string, @Param('id') id: string) {
    return await this.carMaintenanceService.findOne(carId, id);
  }

  @Patch(':id')
  async update(
    @Param('carId') carId: string,
    @Param('id') id: string,
    @Body() updateCarMaintenanceDto: UpdateCarMaintenanceDto,
  ) {
    return await this.carMaintenanceService.update(
      carId,
      id,
      updateCarMaintenanceDto,
    );
  }

  @Delete(':id')
  async remove(@Param('carId') carId: string, @Param('id') id: string) {
    return await this.carMaintenanceService.remove(carId, id);
  }
}
