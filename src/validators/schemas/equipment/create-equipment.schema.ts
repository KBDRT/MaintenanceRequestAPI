import * as z from 'zod';
import { equipmentLocationSchema } from './equipment-location.schema.js';
import { EquipmentType } from '../../../domains/enums/equipment-type.enum.js';
import { EquipmentStatus } from '../../../domains/enums/equipment-status.enum.js';

export const createEquipmentRequestSchema = z.object({
  name: z.string().min(3).max(100),
  type: z.enum(EquipmentType),
  serialNumber: z.string(),
  location: equipmentLocationSchema,
  status: z.enum(EquipmentStatus),
  installedAt: z.iso.date()
})

