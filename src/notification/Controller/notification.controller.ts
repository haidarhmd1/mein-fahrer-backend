import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotificationService } from '../Service/notification.service';
import { IXanoUser } from '../models/notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  getNotification() {
    return this.notificationService.getNotification();
  }

  @Post()
  notification(@Body() xanoUser: IXanoUser) {
    console.log('xanoUser', xanoUser);

    return this.notificationService.postToExternalXanoApi({
      driverFirstName: 'Hakan',
      companyEmail: 'er@driverandservices.de',
    });
    // return this.notificationService.postToExternalXanoApi({
    //   driverFirstName: xanoUser.first_name,
    //   companyEmail: xanoUser._company.admin_email,
    // });
  }
}
