import { DataSource } from 'typeorm';
import { Activity } from './activities.entity';

export const activityProviders = [
  {
    provide: 'ACTIVITY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Activity),
    inject: ['DATA_SOURCE'],
  },
];
