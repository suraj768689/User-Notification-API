import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog } from './notifications.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(NotificationLog.name)
    private readonly notificationModel: Model<NotificationLog>,
  ) {}

  // Method to send a notification
  async sendNotification(userId: string, type: string, channel: string) {
    const newNotification = new this.notificationModel({
      userId,
      type,
      channel,
      status: 'pending',
    });

    try {
      const savedNotification = await newNotification.save();
      console.log('Notification sent:', savedNotification);
      return { message: 'Notification sent successfully', savedNotification };
    } catch (error) {
      console.error('Failed to send notification:', error);
      throw error;
    }
  }

  // Method to get notifications by userId
  async getUserNotifications(userId: string): Promise<NotificationLog[]> {
    try {
      console.log(`Fetching notifications for userId: ${userId}`);
      const notifications = await this.notificationModel.find({ userId }).exec();
      console.log('Fetched Notifications:', notifications);
      return notifications;
    } catch (error) {
      console.error('Error fetching user notifications:', error);
      throw error;
    }
  }

  // Method to get aggregated notification statistics
  async getNotificationStats() {
    try {
      console.log('Fetching notification stats');
      const stats = await this.notificationModel.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]);

      console.log('Fetched Stats:', stats);
      return stats;
    } catch (error) {
      console.error('Error fetching notification stats:', error);
      throw error;
    }
  }
}
