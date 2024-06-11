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
@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly companyService: CompanyService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new car' })
  @ApiCreatedResponse({
    description: 'The car has been successfully created',
    type: CreateCarDto,
  })
  async create(@Body() createCarDto: CreateCarDto) {
    const { companyId } = createCarDto;
    const company = await this.companyService.findOne(companyId);
    return await this.carsService.create(createCarDto, company);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cars' })
  @ApiOkResponse({
    description: 'List of cars retrieved successfully',
    type: [CreateCarDto],
  })
  async findAll() {
    return await this.carsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a car by ID' })
  @ApiOkResponse({
    description: 'Car retrieved successfully',
    type: CreateCarDto,
  })
  @ApiNotFoundResponse({
    description: 'Car not found',
  })
  async findOne(@Param('id') id: string) {
    const car = await this.carsService.findOne(id);
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return car;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a car by ID' })
  @ApiOkResponse({
    description: 'Car updated successfully',
    type: UpdateCarDto,
  })
  @ApiNotFoundResponse({
    description: 'Car not found',
  })
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
  @ApiOperation({ summary: 'Delete a car by ID' })
  @ApiOkResponse({
    description: 'Car deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Car not found',
  })
  async remove(@Param('id') id: string) {
    const car = await this.carsService.findOne(id);
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return await this.carsService.remove(id);
  }
}
