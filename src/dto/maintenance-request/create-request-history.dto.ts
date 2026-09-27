import { MaintenanceRequestStatus } from "../../domains/enums/maintenance-request-status.enum.js";

export interface CreateRequestHistoryDto {
  id: string;
  requestId: string;
  oldStatus: MaintenanceRequestStatus;
  newStatus: MaintenanceRequestStatus;
  author: string;
  commentary: string;
}

