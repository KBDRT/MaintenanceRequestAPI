import * as z from 'zod';

export const getEquipmentsRequestSchema = z.strictObject({
  sort: z.array(z.string()).optional(),
  status: z.array(z.string()).optional(),
  type: z.array(z.string()).optional(),
});

//  sort?: string[],
//   status?: string[],
//   type?: string[],
//   dateFrom?: string,
//   dateTo?: string,
//   pagination?: Pagination,