import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shift } from './entities/shift.entity';
import { Repository } from 'typeorm';
import { UserCompany } from '../user-company/entities/user-company.entity';
import { Car } from '../cars/entities/car.entity';

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,
  ) {}

  async create(
    createShiftDto: CreateShiftDto,
    userCompany: UserCompany,
    car: Car,
  ): Promise<Shift> {
    const shift = this.shiftRepository.create({
      ...createShiftDto,
      userCompany,
      car,
    });
    return await this.shiftRepository.save(shift);
  }

  async findAll(): Promise<Shift[]> {
    return await this.shiftRepository.find();
  }

  async findOne(id: string): Promise<Shift> {
    const shift = await this.shiftRepository.findOneBy({ id });
    if (!shift) {
      throw new NotFoundException('Shift not found');
    }
    return shift;
  }

  async update(id: string, updateShiftDto: UpdateShiftDto): Promise<Shift> {
    const shift = await this.findOne(id);
    Object.assign(shift, updateShiftDto);
    await this.shiftRepository.save(shift);
    return shift;
  }

  async remove(id: string): Promise<void> {
    const result = await this.shiftRepository.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException('Could not delete shift');
    }
  }

  async findShiftsByUser(userCompanyId: string): Promise<Shift[]> {
    const shifts = await this.shiftRepository.findBy({
      userCompany: { id: userCompanyId },
    });

    return shifts;
  }

  async findAllShiftsByUser(userCompanies: UserCompany[]): Promise<any[]> {
    const shifts = await Promise.all(
      userCompanies.map(async (userCompany) => {
        const companyShifts = await this.shiftRepository.find({
          where: { userCompany: { id: userCompany.id } },
        });
        return companyShifts.map((shift) => ({
          ...shift,
          companyId: userCompany.company.id,
        }));
      }),
    );

    return shifts.flat();
  }
}
