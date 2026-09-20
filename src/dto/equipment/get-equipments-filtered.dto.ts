import { Equipment } from "../../domains/entities/equipment.entity.js";

export type SortField = keyof Equipment;
export type SortDirection = 'ASC' | 'DESC';

export class GetEquipmentsFilteredDto {
  sort?: string | SortField[];
  sortDirection?: string | SortDirection[];

  status?: string | string[];
  type?: string | string[];
  id?: string | string[];

  dateFrom?: string;
  dateTo?: string;

  page?: number;
  limit?: number;
}