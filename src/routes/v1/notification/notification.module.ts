import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { HttpModule } from '@nestjs/axios';
import { OneSignalPushService } from '../../../common/services/one-signal-push/one-signal-push.service';

@Module({
  imports: [HttpModule],
  controllers: [NotificationController],
  providers: [NotificationService, OneSignalPushService],
})
export class NotificationModule {}
