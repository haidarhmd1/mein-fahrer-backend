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
import { BankingInformationService } from './banking-information.service';
import { CreateBankingInformationDto } from './dto/create-banking-information.dto';
import { UpdateBankingInformationDto } from './dto/update-banking-information.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserGuard } from 'src/common/guards/user.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, UserGuard)
@Controller('users/:userId/banking-information')
@ApiTags('users')
@ApiBearerAuth()
export class BankingInformationController {
  constructor(
    private readonly bankingInformationService: BankingInformationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create banking information for a user' })
  async create(
    @Param('userId') userId: string,
    @Body() createBankingInformationDto: CreateBankingInformationDto,
  ) {
    return await this.bankingInformationService.create(
      userId,
      createBankingInformationDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Find banking information for a user' })
  @ApiOkResponse({ description: 'Banking information found successfully' })
  @ApiNotFoundResponse({ description: 'Banking information not found' })
  async findOne(@Param('userId') userId: string) {
    return await this.bankingInformationService.findOneByUser(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update banking information for a user' })
  @ApiOkResponse({ description: 'Banking information updated successfully' })
  @ApiNotFoundResponse({ description: 'Banking information not found' })
  async update(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updateBankingInformationDto: UpdateBankingInformationDto,
  ) {
    return await this.bankingInformationService.update(
      id,
      userId,
      updateBankingInformationDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove banking information for a user' })
  @ApiOkResponse({ description: 'Banking information removed successfully' })
  @ApiNotFoundResponse({ description: 'Banking information not found' })
  async remove(@Param('id') id: string) {
    return await this.bankingInformationService.remove(id);
  }
}
