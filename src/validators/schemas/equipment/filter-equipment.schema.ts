import * as z from 'zod';
import { EquipmentType } from '../../../domains/enums/equipment-type.enum.js';
import { EquipmentStatus } from '../../../domains/enums/equipment-status.enum.js';

export const filterEquipmentSchema = z.object({
  sort: z.array(z.string()).optional(),
  sortDirection: z.array(z.enum(['ASC', 'DESC'], "Допустимые значения направления сортировки: ASC или DESC")).optional(),
  status: z.array(z.enum(EquipmentStatus, "Допустимые значения статуса: operational, maintenance, fault, decommissioned")).optional(),
  type: z.array(z.enum(EquipmentType, "Допустимые значения типа: turbine, inverter, sensor, substation")).optional(),
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


