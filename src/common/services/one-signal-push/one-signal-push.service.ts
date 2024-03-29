import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { appConfig } from 'config/appConfig';

// Your REST API Key and App ID
const YOUR_REST_API_KEY = appConfig.ONESIGNAL_REST_API_KEY;
const YOUR_APP_ID = appConfig.ONESIGNAL_APP_ID;

@Injectable()
export class OneSignalPushService {
  constructor(private readonly httpService: HttpService) {}

  public async sendOneSignalPushNotification(
    oneSignalExternalEmailId: string,
    messageBody: any,
  ) {
    const notificationData = {
      app_id: YOUR_APP_ID,
      contents: {
        en: messageBody,
      },
      headings: { en: 'Neue Fahrt 🚀' },
      include_aliases: {
        external_id: [oneSignalExternalEmailId],
      },
      target_channel: 'push',
    };

    try {
      const response: AxiosResponse<any> = await firstValueFrom(
        this.httpService.post(
          'https://api.onesignal.com/notifications',
          notificationData,
          {
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              Authorization: `Basic ${YOUR_REST_API_KEY}`,
            },
          },
        ),
      );

      if (response.data.errors) {
        throw new Error(response.data.errors);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
