import { MaintenanceRequestStatus } from "../../../domains/enums/maintenance-request-status.enum.js";

export interface UpdateMaintenanceRequestStatusRequest {
  newStatus: MaintenanceRequestStatus;
}