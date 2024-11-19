import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from './users.schema';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectModel(UserPreference.name) private userModel: Model<UserPreference>,
  ) {}

  async createUserPreference(data: any): Promise<UserPreference> {
    // Use `create` instead of `new this.userModel`
    const newUser = await this.userModel.create(data);
    return newUser;
  }

  async getUserPreference(userId: string): Promise<UserPreference> {
    return this.userModel.findOne({ userId });
  }

  async updateUserPreference(userId: string, data: any): Promise<UserPreference> {
    return this.userModel.findOneAndUpdate({ userId }, data, { new: true });
  }

  async deleteUserPreference(userId: string): Promise<any> {
    return this.userModel.deleteOne({ userId });
  }
}
