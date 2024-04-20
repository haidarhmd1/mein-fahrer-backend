import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SALT_ROUNDS } from 'src/common/constants/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(email: string, password: string): Promise<User> {
    const newUser = this.usersRepository.create({
      email,
      password,
    });
    return this.usersRepository.save(newUser);
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
    const user = this.usersRepository.findOneBy({ id });
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
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
