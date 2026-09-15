import { Pagination } from "../pagination.js";
import { EquipmentStatus } from "../../domains/enums/equipment-status.enum.js";
import { EquipmentType } from "../../domains/enums/equipment-type.enum.js";


export class getEquipmentsRequest {
  sort?: string | string[];

  status?: string | string[];
  type?: string | string[];

  dateFrom?: string;
  dateTo?: string;

  pagination?: Pagination;
}