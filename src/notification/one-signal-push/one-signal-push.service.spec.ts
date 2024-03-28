import { Test, TestingModule } from '@nestjs/testing';
import { OneSignalPushService } from './one-signal-push.service';

describe('OneSignalPushService', () => {
  let service: OneSignalPushService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OneSignalPushService],
    }).compile();

    service = module.get<OneSignalPushService>(OneSignalPushService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
