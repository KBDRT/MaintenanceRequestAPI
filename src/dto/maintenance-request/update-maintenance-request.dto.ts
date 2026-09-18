import { MaintenanceRequestPriority } from "../../domains/enums/maintenance-request-priotiry.enum.js";

export interface UpdateMaintenanceRequestDto {
  equipmentId: string;
  title: string;
  description: string;
  priority: MaintenanceRequestPriority;
  planntedAt: string;
}