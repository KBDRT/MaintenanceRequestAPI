import * as z from 'zod';
import { MaintenanceRequestPriority } from '../../../domains/enums/maintenance-request-priotiry.enum.js';
import { MaintenanceRequestStatus } from '../../../domains/enums/maintenance-request-status.enum.js';

export const filterRequestSchema = z.strictObject({
  sort: z.array(z.string()).optional(),
  sortDirection: z.array(z.enum(['ASC', 'DESC'])).optional(),
  equipmentsIds: z.array(z.string()).optional(),
  priority: z.array(z.enum(MaintenanceRequestPriority, "Допустимые значения приоритета заявки: low, medium, high, critical")).optional(),
  status: z.array(z.enum(MaintenanceRequestStatus, "Допустимые значения статуса заявки: new, in_progress, done, rejected")).optional(),
  dateFrom: z.iso.date().optional(),
  dateTo: z.iso.date().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().max(1000).default(20),
})
  .refine((data) => {
    if (data.sort && data.sortDirection) {
      return data.sort.length === data.sortDirection.length;
    }
    return true;
  },
  {
    message: "Количество аргументов для сортировки и направления сортировки не одинаковое!",
    path: ['sort'], 
  }
);

