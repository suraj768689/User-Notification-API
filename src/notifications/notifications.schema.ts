import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class NotificationLog extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  type: 'marketing' | 'newsletter' | 'updates';

  @Prop({ required: true })
  channel: 'email' | 'sms' | 'push';

  @Prop({ required: true })
  status: 'pending' | 'sent' | 'failed';

  @Prop()
  sentAt?: Date;

  @Prop()
  failureReason?: string;

  // Add this optional version field to avoid errors
  @Prop({ default: 0 })
  __v?: number; // Mongoose adds __v automatically, but you can make it optional here
}

export const NotificationLogSchema = SchemaFactory.createForClass(NotificationLog);
