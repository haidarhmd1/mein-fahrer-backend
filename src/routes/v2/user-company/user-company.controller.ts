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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, UserGuard)
@ApiTags('user-company')
@ApiBearerAuth()
@Controller('user-company')
export class UserCompanyController {
  constructor(
    private readonly userCompanyService: UserCompanyService,
    private readonly userService: UsersService,
    private readonly companyService: CompanyService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a user-company association' })
  @ApiOkResponse({
    description: 'User-company association created successfully',
  })
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
  @ApiOperation({ summary: 'Get all user-company associations' })
  @ApiOkResponse({
    description: 'User-company associations retrieved successfully',
  })
  async findAll() {
    return await this.userCompanyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user-company association by ID' })
  @ApiOkResponse({
    description: 'User-company association retrieved successfully',
  })
  async findOne(@Param('id') id: string) {
    const userCompany = await this.userCompanyService.findOne(id);
    if (!userCompany) {
      throw new NotFoundException('User-company association not found');
    }
    return userCompany;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user-company association by ID' })
  @ApiOkResponse({
    description: 'User-company association updated successfully',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserCompanyDto: UpdateUserCompanyDto,
  ) {
    const userCompany = await this.userCompanyService.findOne(id);
    if (!userCompany) {
      throw new NotFoundException('User-company association not found');
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
  @ApiOperation({ summary: 'Delete a user-company association by ID' })
  @ApiOkResponse({
    description: 'User-company association deleted successfully',
  })
  async remove(@Param('id') id: string) {
    const userCompany = await this.userCompanyService.findOne(id);
    if (!userCompany) {
      throw new NotFoundException('User-company association not found');
    }
    return await this.userCompanyService.remove(id);
  }

  @Get('/users/:userId/companies')
  @ApiOperation({ summary: 'Get companies associated with a user' })
  @ApiOkResponse({ description: 'Companies retrieved successfully' })
  async findCompaniesByUser(@Param('userId') userId: string) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.userCompanyService.findCompaniesByUser(userId);
  }

  @Get('/companies/:companyId/users')
  @ApiOperation({ summary: 'Get users associated with a company' })
  @ApiOkResponse({ description: 'Users retrieved successfully' })
  async findUsersByCompany(@Param('companyId') companyId: string) {
    const company = await this.companyService.findOne(companyId);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return await this.userCompanyService.findUsersByCompany(companyId);
  }
}
