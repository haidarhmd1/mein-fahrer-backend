import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/routes/v2/users/entities/user.entity';
import { UsersService } from 'src/routes/v2/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { SALT_ROUNDS } from 'src/common/constants/constants';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Wrong Password');
    }

    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<{
    accessToken: string;
  }> {
    const { email, password } = loginUserDto;
    const user = await this.validateUser(email, password);
    const payload = { email: user.email, id: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { email, password } = registerUserDto;
    const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);
    return this.usersService.create(email, hashedPass);
  }
}
