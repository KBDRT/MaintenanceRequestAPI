import { MaintenanceRequestPriority } from "../../domains/enums/maintenance-request-priotiry.enum.js";
import { MaintenanceRequestStatus } from "../../domains/enums/maintenance-request-status.enum.js";

export interface RequestsStatusPriorityStats {
  status?: MaintenanceRequestStatus;
  priority?: MaintenanceRequestPriority;
  count: number;
}