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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('shifts')
@ApiBearerAuth()
@Controller('shifts')
export class ShiftController {
  constructor(
    private readonly shiftService: ShiftService,
    private readonly userCompanyService: UserCompanyService,
    private readonly carService: CarsService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a shift' })
  @ApiOkResponse({ description: 'Shift created successfully' })
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
  @ApiOperation({ summary: 'Get all shifts' })
  @ApiOkResponse({ description: 'Shifts retrieved successfully' })
  async findAll() {
    return await this.shiftService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a shift by ID' })
  @ApiOkResponse({ description: 'Shift retrieved successfully' })
  async findOne(@Param('id') id: string) {
    return await this.shiftService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a shift by ID' })
  @ApiOkResponse({ description: 'Shift updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() updateShiftDto: UpdateShiftDto,
  ) {
    return await this.shiftService.update(id, updateShiftDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a shift by ID' })
  @ApiOkResponse({ description: 'Shift deleted successfully' })
  async remove(@Param('id') id: string) {
    return await this.shiftService.remove(id);
  }

  @Get('/users/:userId')
  @ApiOperation({ summary: 'Get all shifts by user ID' })
  @ApiOkResponse({ description: 'Shifts retrieved successfully' })
  async findShiftsByUser(@Param('userId') userId: string) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userCompanies =
      await this.userCompanyService.findCompaniesByUser(userId);
    if (!userCompanies.length) {
      throw new NotFoundException('No companies found for this user');
    }

    return await this.shiftService.findAllShiftsByUser(userCompanies);
  }

  @Get('/users/:userId/company')
  @ApiOperation({
    summary: 'Get shifts of a user by company they are currently active at',
  })
  @ApiOkResponse({ description: 'Shifts retrieved successfully' })
  async findShiftsByUserAndCompany(@Param('userId') userId: string) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userCompany =
      await this.userCompanyService.findUserByActiveCompany(userId);
    if (!userCompany || !userCompany.isUserActive) {
      throw new NotFoundException(
        'User is not active in the specified company',
      );
    }

    return await this.shiftService.findShiftsByUser(userCompany.id);
  }
}
