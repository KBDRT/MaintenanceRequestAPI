import { MaintenanceRequest } from "../../domains/entities/maintenance-request.entity.js";
import { CreateMaintenanceRequestMassDto } from "../maintenance-request/create-maintenance-request-mass.dto.js";
import { CreateMaintenanceRequestDto } from './../maintenance-request/create-maintenance-request.dto';

export interface MassImportRequestsResult{
  imports: CreateMaintenanceRequestMassDto[],
  totalSuccess: number,
  totalError: number
}