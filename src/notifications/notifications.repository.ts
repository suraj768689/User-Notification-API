import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog } from './notifications.schema';

@Injectable()
export class NotificationsRepository {
  constructor(
    @InjectModel('NotificationLog') 
    private readonly notificationModel: Model<NotificationLog>,
  ) {}

  async logNotification(log: Partial<NotificationLog>): Promise<NotificationLog> {
    try {
      const notification = new this.notificationModel(log);
      return await notification.save();
    } catch (error) {
      throw new Error('Failed to log notification');
    }
  }

  async getUserNotifications(userId: string): Promise<NotificationLog[]> {
    try {
      return await this.notificationModel.find({ userId }).exec();
    } catch (error) {
      throw new Error(`Failed to get notifications for user ${userId}`);
    }
  }

  async getNotificationStats(): Promise<any> {
    try {
      return await this.notificationModel.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]);
    } catch (error) {
      throw new Error('Failed to get notification stats');
    }
  }
}
