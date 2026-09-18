import * as z from 'zod';
import { equipmentLocationSchema } from './equipment-location.schema.js';
import { EquipmentType } from '../../../domains/enums/equipment-type.enum.js';
import { EquipmentStatus } from '../../../domains/enums/equipment-status.enum.js';

export const updateEquipmentRequestSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  type: z.enum(EquipmentType, "Допустимые значения типа: turbine, inverter, sensor, substation").optional(),
  serialNumber: z.string().optional(),
  location: equipmentLocationSchema.optional(),
  status: z.enum(EquipmentStatus, "Допустимые значения статуса: operational, maintenance, fault, decommissioned").optional(),
  installedAt: z.iso.date().optional(),
})
  .refine(
    (data) => Object.keys(data).length > 0,
    { message: 'Хотя бы одно поле должно быть заполнено!' }
);
