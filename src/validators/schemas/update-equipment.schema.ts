import * as z from 'zod';
import { equipmentLocationSchema } from './equipment-location.schema.js';
import { EquipmentType } from '../../domains/enums/equipment-type.enum.js';
import { EquipmentStatus } from '../../domains/enums/equipment-status.enum.js';

export const updateEquipmentRequestSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  type: z.enum(EquipmentType).optional(),
  serialNumber: z.string().optional(),
  location: equipmentLocationSchema.optional(),
  status: z.enum(EquipmentStatus).optional(),
  installedAt: z.iso.date().optional(),
});
