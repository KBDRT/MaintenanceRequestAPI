import { MaintenanceRequest } from "../../domains/entities/maintenance-request.entity.js";

export interface GetRequests{
  requests: MaintenanceRequest[],
  total: number
}