import { MaintenanceRequestPriority } from "../../../domains/enums/maintenance-request-priotiry.enum.js";
import { MaintenanceRequestStatus } from "../../../domains/enums/maintenance-request-status.enum.js";

export interface UpdateMaintenanceRequestRequest {
  equipmentId: string;
  title: string;
  description: string;
  priority: MaintenanceRequestPriority;
  status: MaintenanceRequestStatus;
  planntedAt: string;
}