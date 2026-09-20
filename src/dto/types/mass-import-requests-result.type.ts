import { CreateMaintenanceRequestMassDto } from "../maintenance-request/create-maintenance-request-mass.dto.js";

export interface MassImportRequestsResult{
  imports: CreateMaintenanceRequestMassDto[],
  totalSuccess: number,
  totalError: number
}