import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { NotificationService } from '../Service/notification.service';
import { XanoRequestBodyDto } from 'src/v1/models/notification.dto';
import { apiPrefix } from 'src/utils/constants';

const VERSION = 1;
const CONTROLLER_PREFIX = apiPrefix(VERSION).url_prefix;

@Controller(CONTROLLER_PREFIX + '/notification')
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
