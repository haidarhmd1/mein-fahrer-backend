import { Module } from '@nestjs/common';
import { NotificationModule } from './v1/notification/notification.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NotificationModule,
  ],
})
export class AppModule {}
