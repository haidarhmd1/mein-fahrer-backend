import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  NotFoundException,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CreateUserCompanyDto } from './dto/create-user-company.dto';
import { UpdateUserCompanyDto } from './dto/update-user-company.dto';
import { UserCompanyService } from './user-company.service';
import { CompanyService } from '../company/company.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserGuard } from 'src/common/guards/user.guard';

@UseGuards(JwtAuthGuard, UserGuard)
@Controller('user-company')
export class UserCompanyController {
  constructor(
    private readonly userCompanyService: UserCompanyService,
    private readonly userService: UsersService,
    private readonly companyService: CompanyService,
  ) {}

  @Post()
  async create(@Body() createUserCompanyDto: CreateUserCompanyDto) {
    const { userId, companyId } = createUserCompanyDto;

    const user = await this.userService.findOne(userId);
    const company = await this.companyService.findOne(companyId);

    if (!user || !company) {
      throw new NotFoundException('User or company not found');
    }

    return await this.userCompanyService.create(
      createUserCompanyDto,
      user,
      company,
    );
  }

  @Get()
  async findAll() {
    return await this.userCompanyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userCompany = await this.userCompanyService.findOne(id);
    if (!userCompany) {
      throw new NotFoundException('UserCompany not found');
    }
    return userCompany;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserCompanyDto: UpdateUserCompanyDto,
  ) {
    const userCompany = await this.userCompanyService.findOne(id);
    if (!userCompany) {
      throw new NotFoundException('UserCompany not found');
    }

    const { userId, companyId } = updateUserCompanyDto;

    const user = await this.userService.findOne(userId);
    const company = await this.companyService.findOne(companyId);

    if (!user || !company) {
      throw new NotFoundException('User or company not found');
    }

    return await this.userCompanyService.update(id, updateUserCompanyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const userCompany = await this.userCompanyService.findOne(id);
    if (!userCompany) {
      throw new NotFoundException('UserCompany not found');
    }
    return await this.userCompanyService.remove(id);
  }

  @Get('/users/:userId/companies')
  async findCompaniesByUser(@Param('userId') userId: string) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.userCompanyService.findCompaniesByUser(userId);
  }

  @Get('/companies/:companyId/users')
  async findUsersByCompany(@Param('companyId') companyId: string) {
    const company = await this.companyService.findOne(companyId);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return await this.userCompanyService.findUsersByCompany(companyId);
  }
}
