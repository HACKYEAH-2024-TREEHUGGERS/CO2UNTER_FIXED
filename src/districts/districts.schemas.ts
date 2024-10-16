import { z } from 'zod';

export const DistrictSchema = z.object({
  id_district: z.number().int(),
  co_absorbed: z.number(),
  co_stocked: z.number(),
  pm_removed: z.number(),
  energy_saved: z.number(),
  avoided_runoff: z.number(),
  economic_value: z.number(),
  number_of_plants: z.number().int(),
  number_of_plants_studied: z.number().int(),
});

export type DistrictDto = z.infer<typeof DistrictSchema>;