import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { XanoRequestBodyDto } from 'src/routes/v1/models/notification.dto';

@Controller({ version: '1', path: 'notification' })
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  getNotification() {
    return this.notificationService.getNotification();
  }

  @Post('dispatcher')
  notification(@Body(new ValidationPipe()) body: XanoRequestBodyDto) {
    return this.notificationService.postToExternalXanoApi(body);
  }
}
