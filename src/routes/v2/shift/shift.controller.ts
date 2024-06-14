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
  UseInterceptors,
  UploadedFiles,
  InternalServerErrorException,
  BadRequestException,
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
  ApiConsumes,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'pictures_shift_start',
        maxCount: 1,
      },
      {
        name: 'pictures_shift_end',
        maxCount: 1,
      },
    ]),
  )
  @ApiOperation({ summary: 'Create a shift' })
  @ApiOkResponse({ description: 'Shift created successfully' })
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createShiftDto: CreateShiftDto,
    @UploadedFiles()
    files: {
      pictures_shift_start: Express.Multer.File[];
      pictures_shift_end: Express.Multer.File[];
    },
  ) {
    const { carId, userCompanyId } = createShiftDto;
    const car = await this.carService.findOne(carId);
    const userCompany = await this.userCompanyService.findOne(userCompanyId);

    if (!car || !userCompany) {
      throw new NotFoundException('Car or userCompany not found');
    }

    try {
      return await this.shiftService.create(
        createShiftDto,
        userCompany,
        car,
        files,
      );
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(error.message);
      }
      throw new BadRequestException('Failed to create shift');
    }
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
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'pictures_shift_start', maxCount: 1 },
      { name: 'pictures_shift_end', maxCount: 1 },
    ]),
  )
  @ApiOperation({ summary: 'Update a shift by ID' })
  @ApiOkResponse({ description: 'Shift updated successfully' })
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Body() updateShiftDto: UpdateShiftDto,
    @UploadedFiles()
    files: {
      pictures_shift_start?: Express.Multer.File[];
      pictures_shift_end?: Express.Multer.File[];
    },
  ) {
    try {
      return await this.shiftService.update(id, updateShiftDto, files);
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(error.message);
      }
      throw new BadRequestException('Failed to update shift');
    }
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
