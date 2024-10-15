import { z } from 'zod';

export enum VehicleActivities {
  MOVE_BY_CAR = 'move_by_car',
  MOVE_BY_ELECTRIC_CAR = 'move_by_electric_car',
  MOVE_BY_MOTORBIKE = 'move_by_motorbike',
  MOVE_BY_PUBLIC_TRANSPORT = 'move_by_public_transport',
  MOVE_BY_BIKE = 'move_by_bike',
  MOVE_BY_SCOOTER = 'move_by_scooter',
  MOVE_BY_WALK = 'move_by_walk',
}

export enum MediaActivities {
  CONSUMPTION_ENERGY = 'consumption_energy',
  GARBAGE_WASTE = 'garbage_waste',
}

export const VehicleActivitiesSchema = z.enum([
  VehicleActivities.MOVE_BY_CAR,
  VehicleActivities.MOVE_BY_ELECTRIC_CAR,
  VehicleActivities.MOVE_BY_MOTORBIKE,
  VehicleActivities.MOVE_BY_PUBLIC_TRANSPORT,
  VehicleActivities.MOVE_BY_BIKE,
  VehicleActivities.MOVE_BY_SCOOTER,
  VehicleActivities.MOVE_BY_WALK,
]);

export const MediaActivitiesSchema = z.enum([
  MediaActivities.CONSUMPTION_ENERGY,
  MediaActivities.GARBAGE_WASTE,
]);

export const ActivityNameSchema = z.union([
  VehicleActivitiesSchema,
  MediaActivitiesSchema,
]);

export const ActivityTypeSchema = z.enum(['media', 'transport']);

export const CreateActivitySchema = z
  .object({
    activity: ActivityNameSchema,
    type: ActivityTypeSchema,
    amount: z.number(),
    created_at: z.date().optional(),
  })
  .required();

export type CreateActivityDto = z.infer<typeof CreateActivitySchema>;
