import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.AZURE_POSTGRESQL_HOST,
        port: parseInt(process.env.AZURE_POSTGRESQL_PORT, 10),
        username: process.env.AZURE_POSTGRESQL_USER,
        password: process.env.AZURE_POSTGRESQL_PASSWORD,
        database: process.env.AZURE_POSTGRESQL_DATABASE,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
