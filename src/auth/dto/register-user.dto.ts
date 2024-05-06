import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/common/types/user';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  role: UserRole;
}
