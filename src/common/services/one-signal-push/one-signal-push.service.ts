import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OneSignalPushService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  // Your REST API Key and App ID
  YOUR_REST_API_KEY = this.configService.get('ONESIGNAL_REST_API_KEY');
  YOUR_APP_ID = this.configService.get('ONESIGNAL_APP_ID');

  public async sendOneSignalPushNotification(
    oneSignalExternalEmailId: string,
    messageBody: any,
  ) {
    const notificationData = {
      app_id: this.YOUR_APP_ID,
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
              Authorization: `Basic ${this.YOUR_REST_API_KEY}`,
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
