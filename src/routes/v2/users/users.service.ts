import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SALT_ROUNDS } from 'src/common/constants/constants';
import { UserRole } from 'src/common/types/user';
import { AWSS3HelperService } from 'src/common/services/aws-s3/aws-s3.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly awsS3HelperService: AWSS3HelperService,
  ) {}

  async create(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role = UserRole.USER,
  ): Promise<User> {
    try {
      const newUser = this.usersRepository.create({
        email,
        password,
        firstName,
        lastName,
        role,
      });
      return await this.usersRepository.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        // PostgreSQL unique constraint violation code
        throw new ConflictException('User with this email already exists');
      }
      throw error; // Re-throw other errors
    }
  }

  async updatePassword(id: string, password: string) {
    const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);
    const newPassword = await this.usersRepository.update(
      { id },
      {
        password: hashedPass,
      },
    );

    if (!newPassword) {
      throw new NotFoundException(
        'Something went wrong while updating the password',
      );
    }

    return newPassword;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        bankingInformation: true,
        drivingLicenseInformation: true,
        // shifts: true,
        taxInsuranceInformation: true,
        workInformation: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(`User with email: ${email} not found`);
    }

    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    user_avatar?: Express.Multer.File,
  ): Promise<User> {
    const user = await this.findOne(id);

    if (user_avatar) {
      const uploadedFile =
        await this.awsS3HelperService.uploadSingleFileToS3(user_avatar);
      updateUserDto.user_avatar = uploadedFile;
    }

    Object.assign(user, updateUserDto);
    await this.usersRepository.save(user);
    return user;
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found!');
    }
  }
}
