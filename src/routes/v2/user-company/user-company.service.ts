import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCompany } from './entities/user-company.entity';
import { CreateUserCompanyDto } from './dto/create-user-company.dto';
import { UpdateUserCompanyDto } from './dto/update-user-company.dto';
import { User } from '../users/entities/user.entity';
import { Company } from '../company/entities/company.entity';

@Injectable()
export class UserCompanyService {
  constructor(
    @InjectRepository(UserCompany)
    private readonly userCompanyRepository: Repository<UserCompany>,
  ) {}

  async create(
    createUserCompanyDto: CreateUserCompanyDto,
    user: User,
    company: Company,
  ): Promise<UserCompany> {
    const isUserToCompanyActiveExists =
      await this.userCompanyRepository.findOne({
        where: {
          user: { id: user.id },
          isUserActive: true,
        },
      });

    console.log('isUserToCompanyActiveExists', isUserToCompanyActiveExists);

    if (isUserToCompanyActiveExists) {
      throw new BadRequestException(
        'An entry associated with an active user already exists',
      );
    }

    const userCompany = this.userCompanyRepository.create({
      ...createUserCompanyDto,
      user,
      company,
    });
    return await this.userCompanyRepository.save(userCompany);
  }

  async findAll(): Promise<UserCompany[]> {
    return await this.userCompanyRepository.find();
  }

  async findOne(id: string): Promise<UserCompany> {
    const userCompany = await this.userCompanyRepository.findOne({
      where: { id },
      relations: {
        user: true,
        company: true,
      },
    });
    if (!userCompany) {
      throw new NotFoundException('User not found');
    }
    return userCompany;
  }

  async update(
    id: string,
    updateUserCompanyDto: UpdateUserCompanyDto,
  ): Promise<UserCompany> {
    const updatedUserCompany = await this.findOne(id);
    await this.userCompanyRepository.update(id, updateUserCompanyDto);
    return updatedUserCompany;
  }

  async remove(id: string): Promise<void> {
    const userCompany = await this.findOne(id);
    if (!userCompany) {
      throw new NotFoundException('UserCompany not found');
    }
    await this.userCompanyRepository.softDelete(id);
  }

  async findCompaniesByUser(userId: string): Promise<UserCompany[]> {
    return await this.userCompanyRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findUsersByCompany(companyId: string): Promise<UserCompany[]> {
    return await this.userCompanyRepository.find({
      where: { company: { id: companyId } },
    });
  }

  async findUserByActiveCompany(userId: string): Promise<UserCompany> {
    return await this.userCompanyRepository.findOne({
      where: {
        user: { id: userId },
        isUserActive: true,
      },
    });
  }
}
