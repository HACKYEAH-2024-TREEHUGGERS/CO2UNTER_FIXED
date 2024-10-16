import { Injectable } from '@nestjs/common';
import {
  MediaActivities,
  VehicleActivities,
} from '../activities/activities.schemas';
import {
  EMISSIONS_G_PER_KM,
  EMISSIONS_G_PER_HUMAN_PER_DAY,
  ABSORPTION_G_PER_TREE_YEARLY,
} from './emissions.constants';

@Injectable()
export class EmissionsService {
  calculateEmission(
    activity: VehicleActivities | MediaActivities,
    amount: number,
  ): number {
    if (
      Object.values(VehicleActivities).includes(activity as VehicleActivities)
    ) {
      return this.#calculateTransportEmission(
        activity as VehicleActivities,
        amount,
      );
    } else {
      return this.#calculateMediaEmission(activity as MediaActivities, amount);
    }
  }

  #calculateTransportEmission(
    activity: VehicleActivities,
    amount: number,
  ): number {
    return EMISSIONS_G_PER_KM[activity] * amount;
  }

  #calculateMediaEmission(activity: MediaActivities, amount: number): number {
    // TODO
    return amount * 2000;
  }

  calculateCountryEmission(dayMultiplier: number): {
    [country: string]: number;
  } {
    return Object.entries(EMISSIONS_G_PER_HUMAN_PER_DAY).reduce(
      (acc, [country, emissions]) => {
        acc[country] = emissions * dayMultiplier;
        return acc;
      },
      {} as { [country: string]: number },
    );
  }

  calculateTreesAbsorption(emission: number): { [key: string]: number } {
    return Object.entries(ABSORPTION_G_PER_TREE_YEARLY).reduce(
      (acc, [tree, multiplier]) => {
        acc[tree] = Math.ceil(emission / multiplier);
        return acc;
      },
      {} as { [key: string]: number },
    );
  }
}
