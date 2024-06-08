import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaxInsuranceInformationDto } from './dto/create-tax-insurance-information.dto';
import { UpdateTaxInsuranceInformationDto } from './dto/update-tax-insurance-information.dto';
import { UserValidationService } from 'src/common/services/validation/userValidation.service';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxInsuranceInformation } from './entities/tax-insurance-information.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaxInsuranceInformationService {
  constructor(
    private readonly userValidationService: UserValidationService,
    @InjectRepository(TaxInsuranceInformation)
    private readonly taxInsuranceInformationRepository: Repository<TaxInsuranceInformation>,
  ) {}

  async create(
    userId: string,
    createTaxInsuranceInformationDto: CreateTaxInsuranceInformationDto,
  ): Promise<TaxInsuranceInformation> {
    const user = await this.userValidationService.validateUser(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const taxInsuranceInformation =
      this.taxInsuranceInformationRepository.create({
        ...createTaxInsuranceInformationDto,
        user,
      });
    return await this.taxInsuranceInformationRepository.save(
      taxInsuranceInformation,
    );
  }

  async findOneByUser(userId: string): Promise<TaxInsuranceInformation> {
    const taxInsuranceInformation =
      await this.taxInsuranceInformationRepository.findOne({
        where: { user: { id: userId } },
      });

    if (!taxInsuranceInformation) {
      throw new NotFoundException('Tax Insurance Information not found');
    }

    return taxInsuranceInformation;
  }

  async findOne(id: string, userId: string): Promise<TaxInsuranceInformation> {
    const taxInsuranceInformation =
      await this.taxInsuranceInformationRepository.findOne({
        where: {
          id: id,
          user: { id: userId },
        },
      });

    if (!taxInsuranceInformation) {
      throw new NotFoundException('Tax Insurance Information not found');
    }

    return taxInsuranceInformation;
  }

  async update(
    id: string,
    userId: string,
    updateTaxInsuranceInformationDto: UpdateTaxInsuranceInformationDto,
  ): Promise<TaxInsuranceInformation> {
    const taxInsuranceInformation = await this.findOne(id, userId);
    Object.assign(taxInsuranceInformation, updateTaxInsuranceInformationDto);
    await this.taxInsuranceInformationRepository.save(taxInsuranceInformation);
    return taxInsuranceInformation;
  }

  async remove(id: string): Promise<void> {
    const result = await this.taxInsuranceInformationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Tax Insurance Information not found!');
    }
  }
}
