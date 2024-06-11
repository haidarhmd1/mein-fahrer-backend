import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { WorkInformationService } from './work-information.service';
import { CreateWorkInformationDto } from './dto/create-work-information.dto';
import { UserGuard } from 'src/common/guards/user.guard';
import { UpdateWorkInformationDto } from './dto/update-work-information.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users/:userId/work-information')
@UseGuards(JwtAuthGuard, UserGuard)
export class WorkInformationController {
  constructor(
    private readonly workInformationService: WorkInformationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create work information for a user' })
  @ApiOkResponse({
    description: 'Work information created successfully',
    type: CreateWorkInformationDto,
  })
  async create(
    @Param('userId') userId: string,
    @Body() createWorkInformationDto: CreateWorkInformationDto,
  ) {
    return await this.workInformationService.create(
      userId,
      createWorkInformationDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve work information for a user' })
  @ApiOkResponse({
    description: 'Work information retrieved successfully',
    type: CreateWorkInformationDto,
  })
  async findOne(@Param('userId') userId: string) {
    return await this.workInformationService.findOneByUser(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update work information for a user' })
  @ApiOkResponse({
    description: 'Work information updated successfully',
    type: CreateWorkInformationDto,
  })
  async update(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() updateWorkInformationDto: UpdateWorkInformationDto,
  ) {
    return await this.workInformationService.update(
      id,
      userId,
      updateWorkInformationDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete work information for a user' })
  @ApiOkResponse({
    description: 'Work information deleted successfully',
  })
  remove(@Param('id') id: string) {
    return this.workInformationService.remove(id);
  }
}
