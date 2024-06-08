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
import { TaxInsuranceInformationService } from './tax-insurance-information.service';
import { CreateTaxInsuranceInformationDto } from './dto/create-tax-insurance-information.dto';
import { UpdateTaxInsuranceInformationDto } from './dto/update-tax-insurance-information.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserGuard } from 'src/common/guards/user.guard';

@UseGuards(JwtAuthGuard, UserGuard)
@Controller('users/:userId/tax-insurance-information')
export class TaxInsuranceInformationController {
  constructor(
    private readonly taxInsuranceInformationService: TaxInsuranceInformationService,
  ) {}

  @Post()
  async create(
    @Param('userId') userId: string,
    @Body() createTaxInsuranceInformationDto: CreateTaxInsuranceInformationDto,
  ) {
    return await this.taxInsuranceInformationService.create(
      userId,
      createTaxInsuranceInformationDto,
    );
  }

  @Get()
  async findOne(@Param('id') id: string, @Param('userId') userId: string) {
    return await this.taxInsuranceInformationService.findOneByUser(userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() updateTaxInsuranceInformationDto: UpdateTaxInsuranceInformationDto,
  ) {
    return await this.taxInsuranceInformationService.update(
      id,
      userId,
      updateTaxInsuranceInformationDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.taxInsuranceInformationService.remove(id);
  }
}
