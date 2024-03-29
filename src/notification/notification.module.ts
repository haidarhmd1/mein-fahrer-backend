import { Module } from '@nestjs/common';
import { NotificationController } from './Controller/notification.controller';
import { NotificationService } from './Service/notification.service';
import { HttpModule } from '@nestjs/axios';
import { OneSignalPushService } from '../common/services/one-signal-push/one-signal-push.service';

@Module({
  imports: [HttpModule],
  controllers: [NotificationController],
  providers: [NotificationService, OneSignalPushService],
})
export class NotificationModule {}
