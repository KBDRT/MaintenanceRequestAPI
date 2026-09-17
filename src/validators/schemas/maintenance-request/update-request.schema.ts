import * as z from 'zod';
import { MaintenanceRequestPriority } from '../../../domains/enums/maintenance-request-priotiry.enum.js';

export const updateRequestSchema = z.object({
  equipmentId: z.uuid(),
  title: z.string().min(5).max(120),
  description: z.string().max(2000).optional(),
  priority: z.enum(MaintenanceRequestPriority, "Допустимые значения приоритета заявки: low, medium, high, critical"),
  plannedAt: z.iso.datetime(),
});


