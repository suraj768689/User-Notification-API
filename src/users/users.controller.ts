import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserPreferencesService } from './users.service';
import { CreateUserPreferenceDto } from './dto/user-preferences.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('api/preferences')
export class UserPreferencesController {
  constructor(private userService: UserPreferencesService) {}

  @Post()
  createUser(@Body(new ValidationPipe()) data: CreateUserPreferenceDto) {
    return this.userService.createUserPreference(data);
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return this.userService.getUserPreference(userId);
  }

  @Patch(':userId')
  updateUser(@Param('userId') userId: string, @Body() data: CreateUserPreferenceDto) {
    return this.userService.updateUserPreference(userId, data);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUserPreference(userId);
  }
}
