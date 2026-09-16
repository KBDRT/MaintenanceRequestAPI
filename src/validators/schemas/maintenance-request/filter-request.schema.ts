import * as z from 'zod';
import { paginationSchema } from '../common/pagination.schema.js';
import { MaintenanceRequestPriority } from '../../../domains/enums/maintenance-request-priotiry.enum.js';
import { MaintenanceRequestStatus } from '../../../domains/enums/maintenance-request-status.enum.js';

export const filterRequestSchema = z.object({
  sort: z.array(z.string()).optional(),
  sortDirection: z.array(z.enum(['ASC', 'DESC'])).optional(),
  equipmentsIds: z.array(z.string()).optional(),
  priority: z.array(z.enum(MaintenanceRequestPriority)).optional(),
  status: z.array(z.enum(MaintenanceRequestStatus)).optional(),
  dateFrom: z.iso.date().optional(),
  dateTo: z.iso.date().optional(),
  pagination: paginationSchema.optional()
});
