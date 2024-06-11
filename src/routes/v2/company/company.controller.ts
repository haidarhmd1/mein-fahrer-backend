// company.controller.ts
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
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Roles } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/common/types/user';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('company')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new company' })
  @ApiOkResponse({
    description: 'Company created successfully',
    type: CreateCompanyDto,
  })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all companies' })
  @ApiOkResponse({
    description: 'Companies retrieved successfully',
    type: [CreateCompanyDto],
  })
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiOkResponse({
    description: 'Company retrieved successfully',
    type: CreateCompanyDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Company not found',
  })
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a company by ID' })
  @ApiOkResponse({
    description: 'Company updated successfully',
    type: UpdateCompanyDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Company not found',
  })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a company by ID' })
  @ApiOkResponse({
    description: 'Company deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Company not found',
  })
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
