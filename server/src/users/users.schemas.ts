import { z } from 'zod';

export const CreateUserSchema = z
  .object({
    device_id: z.string().uuid(),
    name: z.string(),
  })
  .required();

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
