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
import { ShiftService } from './shift.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { UserCompanyService } from '../user-company/user-company.service';
import { CarsService } from '../cars/cars.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('shift')
export class ShiftController {
  constructor(
    private readonly shiftService: ShiftService,
    private readonly userCompanyService: UserCompanyService,
    private readonly carService: CarsService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  async create(@Body() createShiftDto: CreateShiftDto) {
    const { carId, userCompanyId } = createShiftDto;

    const car = await this.carService.findOne(carId);
    const userCompany = await this.userCompanyService.findOne(userCompanyId);

    if (!car || !userCompany) {
      throw new NotFoundException('Car or userCompany not found');
    }

    return await this.shiftService.create(createShiftDto, userCompany, car);
  }

  @Get()
  async findAll() {
    return await this.shiftService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.shiftService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShiftDto: UpdateShiftDto,
  ) {
    return await this.shiftService.update(id, updateShiftDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.shiftService.remove(id);
  }

  @Get('/users/:userId/shifts')
  async findShiftsByUser(@Param('userId') userId: string) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { id: userCompanyId } =
      await this.userCompanyService.findUserByActiveCompany(userId);
    return await this.shiftService.findShiftsByUser(userCompanyId);
  }
}
