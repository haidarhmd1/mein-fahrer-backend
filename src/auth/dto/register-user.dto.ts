import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/common/types/user';

export class RegisterUserDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'example@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password of the user' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'First name of the user' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Role of the user', enum: UserRole })
  role: UserRole;
}
