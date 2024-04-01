import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { NotificationService } from '../Service/notification.service';
import {
  XanoNotificationDispatcherDto,
  XanoRequestBodyDto,
} from 'src/models/notification.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  getNotification() {
    return this.notificationService.getNotification();
  }

  @ApiOkResponse({
    description: '',
    type: XanoNotificationDispatcherDto,
  })
  @Post('dispatcher')
  notification(@Body(new ValidationPipe()) body: XanoRequestBodyDto) {
    return this.notificationService.postToExternalXanoApi(body);
  }
}
