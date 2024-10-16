import { Module } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { HttpModule } from '@nestjs/axios';
import { districtProviders } from './districts.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  providers: [...districtProviders, DistrictsService],
  exports: [DistrictsService],
})
export class DistrictsModule {}
