import {Body, Controller, Get, Param, ParseUUIDPipe, Post, Query} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { UsersService } from '../users/users.service';
import { CreateActivityDto } from './activities.schemas';
import { Activity } from './activities.entity';

@Controller('users')
export class ActivitiesController {
  constructor(
    private readonly activitiesService: ActivitiesService,
    private readonly usersService: UsersService,
  ) {}

  @Post(':user_id/activities')
  async createActivity(
    @Param('user_id', new ParseUUIDPipe()) userId: string,
    @Body() activityIn: CreateActivityDto,
  ): Promise<Activity> {
    const user = await this.usersService.getUser(userId);
    return this.activitiesService.createActivity(user, activityIn);
  }

  @Get(':user_id/dashboard')
  async getDashboard(
    @Param('user_id', new ParseUUIDPipe()) userId: string,
    @Query('timeframe') timeframe: string = 'month',
  ): Promise<any> {
    const user = await this.usersService.getUser(userId);
    return this.activitiesService.getDashboard(user, timeframe);
  }
}
