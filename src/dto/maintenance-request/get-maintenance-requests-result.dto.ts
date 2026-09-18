import { MaintenanceRequest } from "../../domains/entities/maintenance-request.entity.js";

export class GetMaintenanceRequestsDto{
  requests?: MaintenanceRequest[];
  total?: number;
}