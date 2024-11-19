import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('send')
  async sendNotification(@Body() body: any) {
    return await this.notificationsService.sendNotification(
      body.userId,
      body.type,
      body.channel,
    );
  }

  @Get(':userId/logs')
  async getUserNotifications(@Param('userId') userId: string) {
    const notifications = await this.notificationsService.getUserNotifications(userId);
    if (notifications.length === 0) {
      console.log(`No notifications found for userId: ${userId}`);
    }
    return notifications;
  }

  @Get('stats')
  async getNotificationStats() {
    const stats = await this.notificationsService.getNotificationStats();
    if (stats.length === 0) {
      console.log('No notification stats found');
    }
    return stats;
  }
}
