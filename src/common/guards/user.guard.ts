// user.guard.ts

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/routes/v2/users/users.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId: string = request.params.userId; // Assuming userId is in request params
    if (!userId) {
      throw new NotFoundException('User ID not found');
    }
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    request.user = user; // Attach user object to request
    return true;
  }
}
