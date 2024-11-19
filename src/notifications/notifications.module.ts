import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationLog, NotificationLogSchema } from './notifications.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NotificationLog.name, schema: NotificationLogSchema }]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
