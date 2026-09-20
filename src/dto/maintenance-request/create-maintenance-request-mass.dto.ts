import { MaintenanceRequest } from "../../domains/entities/maintenance-request.entity.js";
import { ErrorResponse } from "../common/error.response.js";
import { CreateMaintenanceRequestDto } from "./create-maintenance-request.dto.js";

export class CreateMaintenanceRequestMassDto {
  importData?: CreateMaintenanceRequestDto;
  resultData?: MaintenanceRequest;

  success?: boolean;
  error?: ErrorResponse;
}

