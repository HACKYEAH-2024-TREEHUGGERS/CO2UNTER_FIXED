import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ActivitiesModule } from './activities/activities.module';
import { EmissionsModule } from './emissions/emissions.module';
import { DistrictsModule } from './districts/districts.module';

@Module({
  imports: [DatabaseModule, UsersModule, ActivitiesModule, EmissionsModule, DistrictsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
