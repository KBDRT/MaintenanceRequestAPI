import { MaintenanceRequestPriority } from "../../domains/enums/maintenance-request-priotiry.enum";
import { MaintenanceRequestStatus } from "../../domains/enums/maintenance-request-status.enum";

export interface RequestsStatusPriorityStats {
  status?: MaintenanceRequestStatus;
  priority?: MaintenanceRequestPriority;
  count: number;
}