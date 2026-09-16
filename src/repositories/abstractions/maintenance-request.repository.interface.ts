import { MaintenanceRequest } from "../../domains/entities/maintenance-request.entity.js";
import { getEquipmentsRequest } from "../../dto/contracts/equipment/get-equipments.request.js";
import { GetMaintenanceRequestsRequest } from "../../dto/contracts/maintenance-request/get-maintenance-requests.request.js";

export interface IMaintenanceRequestRepository {
  get(request: GetMaintenanceRequestsRequest): Promise<MaintenanceRequest[]>,
  add(newRequest: MaintenanceRequest): Promise<string>,
  getById(id: string): Promise<MaintenanceRequest | undefined>;
  update(updatedRequest: MaintenanceRequest): Promise<void>;
  delete(id: string): Promise<void>;
}