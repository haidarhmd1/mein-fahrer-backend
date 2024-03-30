import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../v2/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport-strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport-strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '60s' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
