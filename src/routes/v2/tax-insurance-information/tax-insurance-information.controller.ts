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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users/:userId/tax-insurance-information')
@UseGuards(JwtAuthGuard, UserGuard)
export class TaxInsuranceInformationController {
  constructor(
    private readonly taxInsuranceInformationService: TaxInsuranceInformationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create tax insurance information for a user' })
  @ApiOkResponse({
    description: 'Tax insurance information created successfully',
    type: CreateTaxInsuranceInformationDto,
  })
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
  @ApiOperation({ summary: 'Retrieve tax insurance information for a user' })
  @ApiOkResponse({
    description: 'Tax insurance information retrieved successfully',
    type: CreateTaxInsuranceInformationDto,
  })
  async findOne(@Param('userId') userId: string) {
    return await this.taxInsuranceInformationService.findOneByUser(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update tax insurance information for a user' })
  @ApiOkResponse({
    description: 'Tax insurance information updated successfully',
    type: CreateTaxInsuranceInformationDto,
  })
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
  @ApiOperation({ summary: 'Delete tax insurance information for a user' })
  @ApiOkResponse({
    description: 'Tax insurance information deleted successfully',
  })
  async remove(@Param('id') id: string) {
    return await this.taxInsuranceInformationService.remove(id);
  }
}
