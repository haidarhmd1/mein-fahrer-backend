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

@UseGuards(JwtAuthGuard, UserGuard)
@Controller('users/:userId/banking-information')
export class BankingInformationController {
  constructor(
    private readonly bankingInformationService: BankingInformationService,
  ) {}

  @Post()
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
  async findOne(@Param('userId') userId: string) {
    return await this.bankingInformationService.findOneByUser(userId);
  }

  @Patch(':id')
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
  async remove(@Param('id') id: string) {
    return await this.bankingInformationService.remove(id);
  }
}
