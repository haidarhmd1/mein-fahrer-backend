import { Module } from '@nestjs/common';
import { NotificationModule } from './routes/v1/notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './routes/v2/users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    NotificationModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
