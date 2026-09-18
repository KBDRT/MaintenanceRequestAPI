import { MaintenanceRequestStatus } from "../domains/enums/maintenance-request-status.enum.js";

const requestAllowStatusChange : Record<MaintenanceRequestStatus, MaintenanceRequestStatus[]> = {
  new:         [MaintenanceRequestStatus.in_progress, MaintenanceRequestStatus.rejected],
  in_progress: [MaintenanceRequestStatus.done, MaintenanceRequestStatus.rejected],
  done:        [],
  rejected:    [],
};

export default requestAllowStatusChange;