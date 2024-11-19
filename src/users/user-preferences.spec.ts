import { Test, TestingModule } from '@nestjs/testing';
import { UserPreferencesService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from './users.schema';

describe('UserPreferencesService', () => {
  let service: UserPreferencesService;
  let model: Model<UserPreference>;

  const createdUser = {
    _id: 'user123',
    userId: 'user123',
    email: 'user@example.com',
    preferences: {
      marketing: true,
      newsletter: true,
      updates: true,
      frequency: 'daily',
      channels: {
        email: true,
        sms: false,
        push: true,
      },
    },
    timezone: 'GMT',
    createdAt: new Date(),
    lastUpdated: new Date(),
  };

  const mockUserModel = {
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(createdUser),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPreferencesService,
        {
          provide: getModelToken(UserPreference.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserPreferencesService>(UserPreferencesService);
    model = module.get<Model<UserPreference>>(getModelToken(UserPreference.name));
  });

  it('should create and return a user preference', async () => {
    mockUserModel.create.mockResolvedValue(createdUser); // Use `.create()` mock directly

    const result = await service.createUserPreference(createdUser);

    expect(result).toEqual(createdUser);
    expect(mockUserModel.create).toHaveBeenCalledWith(createdUser);
  });
});
