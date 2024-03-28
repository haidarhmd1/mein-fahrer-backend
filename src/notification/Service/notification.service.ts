import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IXanoUserArray } from '../models/notification.dto';
import { AxiosResponse } from 'axios';
import { OneSignalPushService } from '../one-signal-push/one-signal-push.service';

const apiKey = 'BZjiyDT6';
const baseUrl = `https://api.bemany.world/api:${apiKey}`;

@Injectable()
export class NotificationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly oneSignalPushService: OneSignalPushService,
  ) {}

  getNotification() {
    return 'get notification';
  }

  public async postToExternalXanoApi({
    driverFirstName,
    companyEmail,
  }: {
    driverFirstName: string;
    companyEmail: string;
  }) {
    const URL = `${baseUrl}/dispatcher/get-driver?company_email=${companyEmail}&driver_first_name=${driverFirstName}`;
    try {
      const response: AxiosResponse<IXanoUserArray> = await firstValueFrom(
        this.httpService.get(URL),
      );

      // if (response.status !== 200) {
      //   // TODO: add to xano db
      // }

      // TODO: send to oneSignal
      await this.oneSignalPushService.sendOneSignalPushNotification(
        response.data[0].onesignal_identifier,
      );

      return {
        success: true,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
