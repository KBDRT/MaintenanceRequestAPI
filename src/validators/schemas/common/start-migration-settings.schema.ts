import * as z from 'zod';

export const startMigrationSettingsSchema = z.object({
  type: z.enum(["migration", "seed"]),
  env: z.enum(["test", "common"]),
  mode: z.enum(["all", "target"]),
  action: z.enum(["up", "down"]),
  target: z.string().optional(),
});
