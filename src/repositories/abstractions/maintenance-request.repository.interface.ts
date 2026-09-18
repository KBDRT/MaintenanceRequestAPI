import { MaintenanceRequest } from "../../domains/entities/maintenance-request.entity.js";
import { MaintenanceRequestStatus } from "../../domains/enums/maintenance-request-status.enum.js";
import { getEquipmentsRequest } from "../../dto/equipment/get-equipments.request.js";
import { GetMaintenanceRequestsRequest } from "../../dto/maintenance-request/get-maintenance-requests.request.js";
import { GetRequests } from "../../dto/types/get-requests.type.js";

export interface IMaintenanceRequestRepository {
  get(request: GetMaintenanceRequestsRequest): Promise<GetRequests>,
  add(newRequest: MaintenanceRequest): Promise<string>,
  getById(id: string): Promise<MaintenanceRequest | undefined>;
  update(updatedRequest: MaintenanceRequest): Promise<void>;
  delete(id: string): Promise<void>;
  existWithStatuses(equipmentId: string, statuses: MaintenanceRequestStatus[]): Promise<boolean>;
}