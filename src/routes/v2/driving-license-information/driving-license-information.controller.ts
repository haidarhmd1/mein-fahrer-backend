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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users/:userId/driving-license-information')
@UseGuards(JwtAuthGuard, UserGuard)
export class DrivingLicenseInformationController {
  constructor(
    private readonly drivingLicenseInformationService: DrivingLicenseInformationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create driving license information for a user' })
  @ApiOkResponse({
    description: 'Driving license information created successfully',
    type: CreateDrivingLicenseInformationDto,
  })
  async create(
    @Param('userId') userId: string,
    @Body()
    createDrivingLicenseInformationDto: CreateDrivingLicenseInformationDto,
  ) {
    return await this.drivingLicenseInformationService.create(
      userId,
      createDrivingLicenseInformationDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve driving license information for a user' })
  @ApiOkResponse({
    description: 'Driving license information retrieved successfully',
    type: CreateDrivingLicenseInformationDto,
  })
  async findOne(@Param('userId') userId: string) {
    return await this.drivingLicenseInformationService.findOneByUser(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update driving license information for a user' })
  @ApiOkResponse({
    description: 'Driving license information updated successfully',
    type: CreateDrivingLicenseInformationDto,
  })
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
  @ApiOperation({ summary: 'Delete driving license information for a user' })
  @ApiOkResponse({
    description: 'Driving license information deleted successfully',
  })
  async remove(@Param('id') id: string) {
    return await this.drivingLicenseInformationService.remove(id);
  }
}
