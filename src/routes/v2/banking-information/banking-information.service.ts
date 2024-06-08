import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankingInformationDto } from './dto/create-banking-information.dto';
import { UpdateBankingInformationDto } from './dto/update-banking-information.dto';
import { UserValidationService } from 'src/common/services/validation/userValidation.service';
import { InjectRepository } from '@nestjs/typeorm';
import { BankingInformation } from './entities/banking-information.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BankingInformationService {
  constructor(
    private readonly userValidationService: UserValidationService,
    @InjectRepository(BankingInformation)
    private readonly bankingInformationRepository: Repository<BankingInformation>,
  ) {}

  async create(
    userId: string,
    createBankingInformationDto: CreateBankingInformationDto,
  ): Promise<BankingInformation> {
    const user = await this.userValidationService.validateUser(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const bankingInformation = this.bankingInformationRepository.create({
      ...createBankingInformationDto,
      user,
    });

    return this.bankingInformationRepository.save(bankingInformation);
  }

  async findOneByUser(userId: string): Promise<BankingInformation> {
    const bankingInformation = await this.bankingInformationRepository.findOne({
      where: {
        user: { id: userId },
      },
    });

    if (!bankingInformation) {
      throw new NotFoundException('Banking Information not found');
    }

    return bankingInformation;
  }

  async findOne(id: string, userId: string): Promise<BankingInformation> {
    const bankingInformation = await this.bankingInformationRepository.findOne({
      where: {
        id: id,
        user: { id: userId },
      },
    });

    if (!bankingInformation) {
      throw new NotFoundException('Banking Information not found');
    }

    return bankingInformation;
  }

  async update(
    id: string,
    userId: string,
    updateBankingInformationDto: UpdateBankingInformationDto,
  ): Promise<BankingInformation> {
    const bankingInformation = await this.findOne(id, userId);
    Object.assign(bankingInformation, updateBankingInformationDto);
    await this.bankingInformationRepository.save(bankingInformation);
    return bankingInformation;
  }

  async remove(id: string): Promise<void> {
    const result = await this.bankingInformationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Banking Information not found');
    }
  }
}
