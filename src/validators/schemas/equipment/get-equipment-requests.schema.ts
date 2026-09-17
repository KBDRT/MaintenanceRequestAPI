import * as z from 'zod';
import { paginationSchema } from '../common/pagination.schema.js';
import { MaintenanceRequestPriority } from '../../../domains/enums/maintenance-request-priotiry.enum.js';
import { MaintenanceRequestStatus } from '../../../domains/enums/maintenance-request-status.enum.js';

export const getEquipmentRequestsSchema = z.strictObject({
  sort: z.array(z.string()).optional(),
  sortDirection: z.array(z.enum(['ASC', 'DESC'])).optional(),
  priority: z.array(z.enum(MaintenanceRequestPriority)).optional(),
  status: z.array(z.enum(MaintenanceRequestStatus)).optional(),
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

