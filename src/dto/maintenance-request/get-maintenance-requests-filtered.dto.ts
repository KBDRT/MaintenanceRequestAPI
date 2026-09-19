import { MaintenanceRequest } from "../../domains/entities/maintenance-request.entity.js";

export type SortField = keyof MaintenanceRequest;
export type SortDirection = 'ASC' | 'DESC';

export class GetMaintenanceRequestsFilteredDto {
  sort?: string | SortField[];
  sortDirection?: string | SortDirection[];

  equipmentIds?: string | string[];
  id?: string | string[];

  priority?: string | string[];
  status?: string | string[];

  dateFrom?: string;
  dateTo?: string;

  page?: number;
  limit?: number;
}