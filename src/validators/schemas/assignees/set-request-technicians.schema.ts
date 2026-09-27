import * as z from 'zod';
import { AssigneeRole } from '../../../domains/enums/assignee-role.enum';

const technicianSchema = z.object({
  technicianId: z.uuid(),
  role: z.enum(AssigneeRole, "Допустимые значения роли специалиста: lead, member"),
  hours: z.coerce.number()
})

export const setRequestTechniciansSchema = z
  .array(technicianSchema)
  .min(1)
  .max(100)
  .refine(
    arr => new Set(arr.map(t => t.technicianId)).size === arr.length,
    { message: 'В списке присутствуют одинаковые специалисты'},
  );

