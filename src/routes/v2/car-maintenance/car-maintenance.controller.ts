import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { CarMaintenanceService } from './car-maintenance.service';
import { CreateCarMaintenanceDto } from './dto/create-car-maintenance.dto';
import { UpdateCarMaintenanceDto } from './dto/update-car-maintenance.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('cars')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cars/:carId/car-maintenance')
export class CarMaintenanceController {
  constructor(private readonly carMaintenanceService: CarMaintenanceService) {}

  @Post()
  @ApiOperation({ summary: 'Create car maintenance information' })
  @ApiCreatedResponse({
    description: 'Car maintenance information created successfully',
    type: CreateCarMaintenanceDto,
  })
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
  @ApiOperation({ summary: 'Get all car maintenance information' })
  @ApiOkResponse({
    description: 'List of car maintenance information retrieved successfully',
    type: [CreateCarMaintenanceDto],
  })
  async findAll(@Param('carId') carId: string) {
    return await this.carMaintenanceService.findAll(carId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get car maintenance information by ID' })
  @ApiOkResponse({
    description: 'Car maintenance information retrieved successfully',
    type: CreateCarMaintenanceDto,
  })
  @ApiNotFoundResponse({
    description: 'Car maintenance information not found',
  })
  async findOne(@Param('carId') carId: string, @Param('id') id: string) {
    const carMaintenance = await this.carMaintenanceService.findOne(carId, id);
    if (!carMaintenance) {
      throw new NotFoundException('Car maintenance information not found');
    }
    return carMaintenance;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update car maintenance information by ID' })
  @ApiOkResponse({
    description: 'Car maintenance information updated successfully',
    type: UpdateCarMaintenanceDto,
  })
  @ApiNotFoundResponse({
    description: 'Car maintenance information not found',
  })
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
  @ApiOperation({ summary: 'Delete car maintenance information by ID' })
  @ApiOkResponse({
    description: 'Car maintenance information deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Car maintenance information not found',
  })
  async remove(@Param('carId') carId: string, @Param('id') id: string) {
    return await this.carMaintenanceService.remove(carId, id);
  }
}
