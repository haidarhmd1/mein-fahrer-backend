import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { NotificationService } from '../Service/notification.service';
import { XanoRequestBodyDto } from 'src/models/notification.dto';

@Controller('notification')
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
