import { MaintenanceRequest } from "../../domains/entities/maintenance-request.entity.js";

export type SortField = keyof MaintenanceRequest;
export type SortDirection = 'ASC' | 'DESC';

export class GetEquipmentRequestsDto {
  sort?: string | SortField[];
  sortDirection?: string | SortDirection[];

  priority?: string | string[];
  status?: string | string[];

  dateFrom?: string;
  dateTo?: string;

  page?: number;
  limit?: number;
}