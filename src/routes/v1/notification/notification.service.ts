import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  XanoRequestBodyDto,
  XanoUserResponseArrayDto,
} from '../models/notification.dto';
import { AxiosResponse } from 'axios';
import { OneSignalPushService } from '../../../common/services/one-signal-push/one-signal-push.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly oneSignalPushService: OneSignalPushService,
  ) {}

  apiKey = this.configService.get('BEMANY_API_KEY');
  baseUrl = `https://api.bemany.world/api:${this.apiKey}`;

  getNotification() {
    return 'get notification';
  }

  public async postToExternalXanoApi(XanoUserBody: XanoRequestBodyDto) {
    const URL_POST = `${this.baseUrl}/dispatcher/uber-rides`;
    const URL = `${this.baseUrl}/dispatcher/get-driver?company_email=${XanoUserBody.unternehmen}&driver_first_name=${XanoUserBody.fahrer}`;

    const response: AxiosResponse<XanoUserResponseArrayDto> =
      await firstValueFrom(this.httpService.get(URL));

    await this.oneSignalPushService.sendOneSignalPushNotification(
      response.data[0].email,
      `Preis: ${XanoUserBody.preis}
       Abholort: ${XanoUserBody.abholadresse}
       Zieladresse: ${XanoUserBody.zieladresse}
       Entfernung: ${XanoUserBody.entfernung}
       Firma: ${XanoUserBody.unternehmen}
       Fahrer: ${XanoUserBody.fahrer}
       Fahrer ID: ${response.data[0].id}`,
    );

    const responsePost: AxiosResponse<any> = await firstValueFrom(
      this.httpService.post(URL_POST, {
        driver_first_name: XanoUserBody.fahrer,
        driver_id: response.data[0].id,
        companys_id: response.data[0].companys_id,
        pickup: XanoUserBody.abholadresse,
        destination: XanoUserBody.zieladresse,
        price: XanoUserBody.preis,
        distance: XanoUserBody.entfernung,
      }),
    );

    if (responsePost.status !== 200) {
      throw new HttpException(
        "something wen't wrong :/",
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      success: true,
      response: responsePost.data,
    };
  }
}
