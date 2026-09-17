import { MaintenanceRequestPriority } from "../../domains/enums/maintenance-request-priotiry.enum.js";

export interface CreateMaintenanceRequest {
  equipmentId: string;
  title: string;
  description: string;
  priority: MaintenanceRequestPriority;
  planntedAt: string;
}

