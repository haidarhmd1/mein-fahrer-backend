import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'example@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password of the user' })
  @IsNotEmpty()
  password: string;
}
