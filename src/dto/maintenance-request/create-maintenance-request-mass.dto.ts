import { MaintenanceRequest } from "../../domains/entities/maintenance-request.entity.js";
import { MaintenanceRequestPriority } from "../../domains/enums/maintenance-request-priotiry.enum.js";
import { ErrorDetails } from "../../errors/types/error-details.js";
import { ErrorResponse } from "../common/error.response.js";
import { CreateMaintenanceRequestDto } from "./create-maintenance-request.dto.js";

export class CreateMaintenanceRequestMassDto {
  importData?: CreateMaintenanceRequestDto;
  resultData?: MaintenanceRequest;

  success?: boolean;
  error?: ErrorResponse;
}

