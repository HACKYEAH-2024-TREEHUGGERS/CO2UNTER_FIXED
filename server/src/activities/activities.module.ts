import { Module } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { UsersModule } from '../users/users.module';
import { ActivitiesService } from './activities.service';
import { activityProviders } from './activities.providers';
import { DatabaseModule } from '../database/database.module';
import { EmissionsModule } from '../emissions/emissions.module';
import { DistrictsModule } from '../districts/districts.module';

@Module({
  imports: [DatabaseModule, UsersModule, EmissionsModule, DistrictsModule],
  controllers: [ActivitiesController],
  providers: [...activityProviders, ActivitiesService],
})
export class ActivitiesModule {}
