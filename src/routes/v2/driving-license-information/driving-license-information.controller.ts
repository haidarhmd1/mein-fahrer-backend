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
import { DrivingLicenseInformationService } from './driving-license-information.service';
import { CreateDrivingLicenseInformationDto } from './dto/create-driving-license-information.dto';
import { UpdateDrivingLicenseInformationDto } from './dto/update-driving-license-information.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserGuard } from 'src/common/guards/user.guard';

@UseGuards(JwtAuthGuard, UserGuard)
@Controller('users/:userId/driving-license-information')
export class DrivingLicenseInformationController {
  constructor(
    private readonly drivingLicenseInformationService: DrivingLicenseInformationService,
  ) {}

  @Post()
  create(
    @Param('userId') userId: string,
    @Body()
    createDrivingLicenseInformationDto: CreateDrivingLicenseInformationDto,
  ) {
    return this.drivingLicenseInformationService.create(
      userId,
      createDrivingLicenseInformationDto,
    );
  }

  @Get()
  async findOne(@Param('userId') userId: string) {
    return await this.drivingLicenseInformationService.findOneByUser(userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body()
    updateDrivingLicenseInformationDto: UpdateDrivingLicenseInformationDto,
  ) {
    return await this.drivingLicenseInformationService.update(
      id,
      userId,
      updateDrivingLicenseInformationDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.drivingLicenseInformationService.remove(id);
  }
}
