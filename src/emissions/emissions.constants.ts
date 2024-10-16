import { VehicleActivities } from '../activities/activities.schemas';

export const EMISSIONS_G_PER_KM: { [key in VehicleActivities]: number } = {
  [VehicleActivities.MOVE_BY_CAR]: 160,
  [VehicleActivities.MOVE_BY_ELECTRIC_CAR]: 50,
  [VehicleActivities.MOVE_BY_MOTORBIKE]: 95,
  [VehicleActivities.MOVE_BY_PUBLIC_TRANSPORT]: 65,
  [VehicleActivities.MOVE_BY_BIKE]: 0,
  [VehicleActivities.MOVE_BY_SCOOTER]: 35,
  [VehicleActivities.MOVE_BY_WALK]: 0,
};

export const EMISSIONS_G_PER_HUMAN_PER_DAY: { [key: string]: number } = {
  poland: 8490,
  eu: 6020,
};

export const ABSORPTION_G_PER_TREE_YEARLY: { [key: string]: number } = {
  adult: 50000,
  medium: 22000,
  small: 5500,
};
