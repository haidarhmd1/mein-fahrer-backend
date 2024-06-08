import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkInformationDto } from './dto/create-work-information.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkInformation } from './entities/work-information.entity';
import { Repository } from 'typeorm';
import { UserValidationService } from 'src/common/services/validation/userValidation.service';
import { UpdateWorkInformationDto } from './dto/update-work-information.dto';

@Injectable()
export class WorkInformationService {
  constructor(
    private readonly userValidationService: UserValidationService,
    @InjectRepository(WorkInformation)
    private readonly workInformationRepository: Repository<WorkInformation>,
  ) {}

  async create(
    userId: string,
    createWorkInformationDto: CreateWorkInformationDto,
  ): Promise<WorkInformation> {
    const user = await this.userValidationService.validateUser(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const workInformation = this.workInformationRepository.create({
      ...createWorkInformationDto,
      user,
    });
    return await this.workInformationRepository.save(workInformation);
  }

  async findOneByUser(userId: string): Promise<WorkInformation> {
    const workInformation = await this.workInformationRepository.findOne({
      where: {
        user: { id: userId },
      },
    });
    return workInformation;
  }

  async findOne(id: string, userId: string): Promise<WorkInformation> {
    const workInformation = await this.workInformationRepository.findOne({
      where: {
        id: id,
        user: { id: userId },
      },
    });
    return workInformation;
  }

  async update(
    id: string,
    userId: string,
    updateWorkInformationDto: UpdateWorkInformationDto,
  ): Promise<WorkInformation> {
    const workInformation = await this.findOne(id, userId);
    Object.assign(workInformation, updateWorkInformationDto);
    await this.workInformationRepository.save(workInformation);
    return workInformation;
  }

  async remove(id: string): Promise<void> {
    const result = await this.workInformationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found!');
    }
  }
}
