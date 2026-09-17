import * as z from 'zod';
import { MaintenanceRequestStatus } from '../../../domains/enums/maintenance-request-status.enum.js';

export const updateRequestStatusSchema = z.object({
  newStatus: z.enum(MaintenanceRequestStatus, "Допустимые значения статуса заявки: new, in_progress, done, rejected"),
});


