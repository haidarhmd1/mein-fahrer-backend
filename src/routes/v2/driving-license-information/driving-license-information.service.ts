import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDrivingLicenseInformationDto } from './dto/create-driving-license-information.dto';
import { UpdateDrivingLicenseInformationDto } from './dto/update-driving-license-information.dto';
import { UserValidationService } from 'src/common/services/validation/userValidation.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DrivingLicenseInformation } from './entities/driving-license-information.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DrivingLicenseInformationService {
  constructor(
    private readonly userValidationService: UserValidationService,
    @InjectRepository(DrivingLicenseInformation)
    private readonly drivingLicenseInformationRepository: Repository<DrivingLicenseInformation>,
  ) {}

  async create(
    userId: string,
    createDrivingLicenseInformationDto: CreateDrivingLicenseInformationDto,
  ): Promise<DrivingLicenseInformation> {
    const user = await this.userValidationService.validateUser(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const drivingLicenseInformation =
      this.drivingLicenseInformationRepository.create({
        ...createDrivingLicenseInformationDto,
        user,
      });
    return await this.drivingLicenseInformationRepository.save(
      drivingLicenseInformation,
    );
  }

  async findOneByUser(userId: string): Promise<DrivingLicenseInformation> {
    const drivingLicenseInformation =
      await this.drivingLicenseInformationRepository.findOne({
        where: { user: { id: userId } },
      });

    if (!drivingLicenseInformation) {
      throw new NotFoundException('Driving License Information not found');
    }

    return drivingLicenseInformation;
  }

  async findOne(
    id: string,
    userId: string,
  ): Promise<DrivingLicenseInformation> {
    const drivingLicenseInformation =
      await this.drivingLicenseInformationRepository.findOne({
        where: {
          id: id,
          user: { id: userId },
        },
      });

    if (!drivingLicenseInformation) {
      throw new NotFoundException('Driving License Information not found');
    }

    return drivingLicenseInformation;
  }

  async update(
    id: string,
    userId: string,
    updateDrivingLicenseInformationDto: UpdateDrivingLicenseInformationDto,
  ): Promise<DrivingLicenseInformation> {
    const drivingLicenseInformation = await this.findOne(id, userId);
    Object.assign(
      drivingLicenseInformation,
      updateDrivingLicenseInformationDto,
    );
    await this.drivingLicenseInformationRepository.save(
      drivingLicenseInformation,
    );
    return drivingLicenseInformation;
  }

  async remove(id: string): Promise<void> {
    const result = await this.drivingLicenseInformationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Driving License Information not found');
    }
  }
}
