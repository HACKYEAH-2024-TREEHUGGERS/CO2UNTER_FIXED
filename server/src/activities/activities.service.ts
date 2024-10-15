import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Activity } from './activities.entity';
import { User } from '../users/users.entity';
import { CreateActivityDto } from './activities.schemas';
import { EmissionsService } from '../emissions/emissions.service';
import { DistrictsService } from '../districts/districts.service';

@Injectable()
export class ActivitiesService {
  constructor(
    @Inject('ACTIVITY_REPOSITORY')
    private activityRepository: Repository<Activity>,
    private readonly emissionsService: EmissionsService,
    private readonly districtsService: DistrictsService,
  ) {}

  async createActivity(
    user: User,
    activityIn: CreateActivityDto,
  ): Promise<Activity> {
    const emission = this.emissionsService.calculateEmission(
      activityIn.activity,
      activityIn.amount,
    );

    const activity = this.activityRepository.create({
      ...activityIn,
      emission: emission,
      created_by: user,
    });

    await this.activityRepository.save(activity);

    return activity;
  }

  async getDashboard(user: User, timeframe: string): Promise<any> {
    const now = new Date();
    let startTime: Date;
    let dayMultiplier: number;

    const day = 24 * 60 * 60 * 1000;
    switch (timeframe) {
      case 'day':
        startTime = new Date(now.getTime() - day);
        dayMultiplier = 1;
        break;
      case 'week':
        startTime = new Date(now.getTime() - 7 * day);
        dayMultiplier = 7;
        break;
      case 'month':
        startTime = new Date(now.getTime() - 30 * day);
        dayMultiplier = 30;
        break;
      default:
        startTime = new Date(now.getTime() - 365 * day);
        dayMultiplier = 365;
        break;
    }

    const totalEmissions = await this.getTotalEmissions(user.id, startTime);

    const yearly_emission = (totalEmissions / dayMultiplier) * 365;

    return {
      summary: totalEmissions,
      country_emission_per_timeline:
        this.emissionsService.calculateCountryEmission(dayMultiplier),
      trees: this.emissionsService.calculateTreesAbsorption(yearly_emission),
      jordan_trees_percentage:
        await this.districtsService.getJordanPercentage(yearly_emission),
    };
  }

  async getTotalEmissions(userId: string, startTime: Date): Promise<number> {
    const totalEmissions = await this.activityRepository
      .createQueryBuilder('activity')
      .select('SUM(activity.emission)', 'sum')
      .where('activity.created_by = :userId', { userId: userId })
      .andWhere('activity.created_at > :startTime', { startTime })
      .getRawOne();

    return totalEmissions.sum ? parseFloat(totalEmissions.sum) : 0;
  }
}
