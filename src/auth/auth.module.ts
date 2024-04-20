import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport-strategies/local.strategy';
import { JwtStrategy } from './passport-strategies/jwt.strategy';
import { UsersModule } from 'src/routes/v2/users/users.module';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
