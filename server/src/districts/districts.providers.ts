import { DataSource } from 'typeorm';
import { District } from './districts.entity';

export const districtProviders = [
  {
    provide: 'DISTRICT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(District),
    inject: ['DATA_SOURCE'],
  },
];
