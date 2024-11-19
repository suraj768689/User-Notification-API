import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';

describe('NotificationsController', () => {
  let controller: NotificationsController;
  let service: NotificationsService;

  beforeEach(async () => {
    const mockNotificationService = {
      sendNotification: jest.fn().mockResolvedValue({
        message: 'Notification sent successfully',
        savedNotification: {
          userId: 'user123',
          type: 'marketing',
          channel: 'email',
          status: 'pending',
          _id: 'someGeneratedId',
        },
      }),
      getUserNotifications: jest.fn().mockResolvedValue([
        {
          userId: 'user123',
          type: 'marketing',
          channel: 'email',
          status: 'sent',
          _id: 'someGeneratedId',
        },
      ]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        {
          provide: NotificationsService,
          useValue: mockNotificationService,
        },
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
    service = module.get<NotificationsService>(NotificationsService);
  });

  describe('sendNotification', () => {
    it('should send a notification', async () => {
      const result = await service.sendNotification(
        'user123',
        'marketing',
        'email',
      );

      expect(result).toEqual({
        message: 'Notification sent successfully',
        savedNotification: {
          userId: 'user123',
          type: 'marketing',
          channel: 'email',
          status: 'pending',
          _id: 'someGeneratedId',
        },
      });
    });
  });

  describe('getUserNotifications', () => {
    it('should fetch user notifications', async () => {
      const result = await service.getUserNotifications('user123');
      expect(result).toEqual([
        {
          userId: 'user123',
          type: 'marketing',
          channel: 'email',
          status: 'sent',
          _id: 'someGeneratedId',
        },
      ]);
    });
  });
});
