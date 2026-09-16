import * as z from 'zod';
import { paginationSchema } from '../common/pagination.schema.js';
import { EquipmentType } from '../../../domains/enums/equipment-type.enum.js';
import { EquipmentStatus } from '../../../domains/enums/equipment-status.enum.js';

export const filterEquipmentSchema = z.object({
  sort: z.array(z.string()).optional(),
  sortDirection: z.array(z.enum(['ASC', 'DESC'])).optional(),
  status: z.array(z.enum(EquipmentStatus)).optional(),
  type: z.array(z.enum(EquipmentType)).optional(),
  dateFrom: z.iso.date().optional(),
  dateTo: z.iso.date().optional(),
  pagination: paginationSchema.optional()
});

