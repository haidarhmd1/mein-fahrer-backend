import { env } from 'env';

export const appConfig = {
  PORT: env.PORT,
  ONESIGNAL_REST_API_KEY: env.ONESIGNAL_REST_API_KEY,
  ONESIGNAL_APP_ID: env.ONESIGNAL_APP_ID,
};
