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

@Controller('users/:userId/work-information')
@UseGuards(JwtAuthGuard, UserGuard)
export class WorkInformationController {
  constructor(
    private readonly workInformationService: WorkInformationService,
  ) {}

  @Post()
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
  async findOne(@Param('userId') userId: string) {
    return await this.workInformationService.findOneByUser(userId);
  }

  @Patch(':id')
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
  remove(@Param('id') id: string) {
    return this.workInformationService.remove(id);
  }
}
