import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { appConfig } from 'src/config/appConfig';

// Your REST API Key and App ID
const YOUR_REST_API_KEY = appConfig.ONESIGNAL_REST_API_KEY;
const YOUR_APP_ID = appConfig.ONESIGNAL_APP_ID;

@Injectable()
export class OneSignalPushService {
  constructor(private readonly httpService: HttpService) {}

  public async sendOneSignalPushNotification(oneSignalIdList: string[]) {
    const notificationData = {
      app_id: YOUR_APP_ID,
      contents: { en: 'Hello' },
      headings: { en: 'English' },
      //   included_segments: ['Total Subscriptions'],
      include_aliases: {
        external_id: ['aabca699-c571-4c8a-af65-53d289fe8fbc'],
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
