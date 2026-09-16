import * as z from 'zod';
import { MaintenanceRequestStatus } from '../../../domains/enums/maintenance-request-status.enum.js';

export const updateRequestStatus = z.object({
  newStatus: z.enum(MaintenanceRequestStatus),
});


