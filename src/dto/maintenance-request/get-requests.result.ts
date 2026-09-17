import { MaintenanceRequest } from "../../domains/entities/maintenance-request.entity.js";

export class GetRequetsResult{
  requests?: MaintenanceRequest[];
  total?: number;
}