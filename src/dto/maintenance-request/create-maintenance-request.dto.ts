import { MaintenanceRequestPriority } from "../../domains/enums/maintenance-request-priotiry.enum.js";

export interface CreateMaintenanceRequestDto {
  equipmentId: string;
  title: string;
  description: string;
  priority: MaintenanceRequestPriority;
  planntedAt: string;
}

