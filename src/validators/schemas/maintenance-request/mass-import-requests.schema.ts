import * as z from 'zod';

export const massImportRequestsSchema = z.array(z.any()).min(1).max(1000);

