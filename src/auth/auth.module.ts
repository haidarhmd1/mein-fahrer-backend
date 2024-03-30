import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../v2/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport-strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/utils/constants';
import { JwtStrategy } from './passport-strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
