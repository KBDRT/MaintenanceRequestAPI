import { Pagination } from "../../common/pagination.js";
import { EquipmentStatus } from "../../../domains/enums/equipment-status.enum.js";
import { EquipmentType } from "../../../domains/enums/equipment-type.enum.js";
import { Equipment } from "../../../domains/entities/equipment.entity.js";

export type SortField = keyof Equipment;
export type SortDirection = 'ASC' | 'DESC';

export class getEquipmentsRequest {
  sort?: string | SortField[];
  sortDirection?: string | SortDirection[];

  status?: string | string[];
  type?: string | string[];

  dateFrom?: string;
  dateTo?: string;

  pagination?: Pagination;
}