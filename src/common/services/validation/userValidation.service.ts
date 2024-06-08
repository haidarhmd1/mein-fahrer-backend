import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/routes/v2/users/entities/user.entity';
import { UsersService } from 'src/routes/v2/users/users.service';

@Injectable()
export class UserValidationService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(userId: string): Promise<User> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
